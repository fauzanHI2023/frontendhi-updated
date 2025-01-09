"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchCampaign } from "@/lib/donation/campaign/auth-campaign";
import { fetchPaymentChannel } from "@/lib/donation/transaction/auth-payment-channel";
import { fetchDeleteCart } from "@/lib/donation/transaction/auth-delete-cart";
import Link from "next/link";
import Swal from "sweetalert2";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { FaCartPlus, FaOpencart } from "react-icons/fa";
import Cookies from "js-cookie";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  phpDonorData: any;
  phones: any;
}

const Checkout: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [paymentChannels, setPaymentChannels] = useState<any[]>([]);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState<
    number | null
  >(null);
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const { cartItems, setCartItems, removeItemFromCart } = useCart();
  const [notifMessage, setNotifMessage] = useState("");

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      const user = session.user as User;
      setUserId(user.phpDonorData.id);
      setFullName(user.full_name);
      setEmail(user.email);
      setPhone(user.phones.phone_no)
    }

    const cartItems = JSON.parse(localStorage.getItem("osscart") || "[]");

    // Gabungkan quantity jika campaign_id sama
    const mergedCart: any[] = [];
    cartItems.forEach((item: any) => {
      const existingItem = mergedCart.find(
        (c) => c.campaign_id === item.campaign_id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        mergedCart.push({ ...item });
      }
    });

    setCartItems(mergedCart);

    const updateCartWithCampaignNames = async () => {
      try {
        // Ambil semua data kampanye
        const allCampaigns = await fetchCampaign(); // fetchCampaign mengembalikan semua data

        if (!allCampaigns || !allCampaigns.data) {
          console.error("Failed to fetch campaigns or no data found.");
          return;
        }

        // Perbarui item di cart berdasarkan data kampanye
        const updatedCart = mergedCart.map((item) => {
          const campaignData = allCampaigns.data.find(
            (campaign: any) => Number(campaign.id) === Number(item.campaign_id)
          );

          if (campaignData) {
            item.name = campaignData.campaign_name;
            console.log(`Item updated: ${item.campaign_id} -> ${item.name}`);
          } else {
            console.warn(
              `Campaign data mismatch or missing for item. Item campaign_id: ${item.campaign_id}, API id: undefined`
            );
          }

          return item;
        });

        // Simpan hasil di state
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error updating cart with campaign names:", error);
      }
    };

    updateCartWithCampaignNames();

    const fetchChannels = async () => {
      try {
        const channels = await fetchPaymentChannel();
        setPaymentChannels(channels.data || []);
      } catch (error) {
        console.error("Error fetching payment channels:", error);
      }
    };

    fetchChannels();

    const loadSnapScript = () => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-UF_dlhjGXoaigX0y");
      script.async = true;
      script.onload = () => {
        console.log("Snap script loaded successfully.");
      };
      script.onerror = () => {
        console.error("Failed to load Snap script.");
      };
      document.body.appendChild(script);
    };

    loadSnapScript();
  }, [status, session]);

  const handleDonateNow = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!userId && (!fullName || !email)) {
      setNotifMessage("Enter Your Information");
      return;
    }
  
    try {
      // Pastikan ada metode pembayaran yang dipilih
      const selectedPayment = paymentChannels.find(
        (channel) => channel.id === selectedPaymentChannel
      );
  
      if (!selectedPayment) {
        setNotifMessage("Pilih metode pembayaran terlebih dahulu.");
        return;
      }
  
      // Tentukan endpoint berdasarkan metode pembayaran
      const isBankTransfer = selectedPayment.donation_payment_id === 1;
  
      const endpoint = isBankTransfer
        ? "https://adminx.human-initiative.org/donation/create-transaction-bank-transfer"
        : "https://adminx.human-initiative.org/donation/create-transaction";
  
      // Kirim data transaksi
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          full_name: fullName,
          email: email,
          phone: phone,
          payment_channel_id: selectedPaymentChannel,
          items: cartItems.map((item) => ({
            campaign_id: item.campaign_id,
            quantity: item.quantity,
            price: item.amount,
          })),
        }),
      });
  
      const data = await response.json();
  
      if (data.status === "success") {
        const cookiesId = Cookies.get("osscart");

        if (cookiesId) {
          // Hapus data transaksi menggunakan cookies_id
          await fetchDeleteCart(cookiesId);
        }
        // Navigasi berdasarkan metode pembayaran
        if (isBankTransfer) {
          const transactionId = data.transaction_id;
          router.push(`/paymentbanktransfer?transaction_id=${transactionId}`);
        } else {
          if (window.snap) {
            window.snap.pay(data.snap_token, {
              onSuccess: (result: any) => {
                console.log("Transaction successful", result);
                router.push(
                  `paymentbanktransfer?transaction_id=${result.order_id}`
                );
              },
              onPending: (result: any) =>
                console.log("Transaction pending", result),
              onError: (result: any) =>
                console.log("Transaction failed", result),
              onClose: () => console.log("Transaction popup closed"),
            });
          }
        }
      } else {
        console.error("Error creating transaction:", data.message);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  
  const handleSelectPaymentChannel = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentChannel(Number(event.target.value));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
  };

  const handleDeleteItem = (campaignId: number) => {
    removeItemFromCart(campaignId);
    Swal.fire({
      icon: "success",
      title: "Item removed",
      text: "The selected item has been removed from your cartItems.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <main className="flex min-h-screen flex-row justify-center gap-x-4 px-16 py-36 bg-gray-100 dark:bg-slate-900">
      <div className="box flex flex-col gap-y-2 w-[800px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Order Information
          </h1>
          <Link
            href={`/joinourmovement/donate`}
            className="flex flex-row justify-center items-center gap-x-2 py-2 px-3 rounded bg-sky-600 text-white dark:bg-white dark:text-slate-800 transition ease-in duration-300 hover:bg-sky-800"
          >
            <FaCartPlus/>
            Add Donate
          </Link>
        </div>
        <div className="mb-2 shadow-xl rounded-xl bg-white dark:bg-slate-900 p-6">
          <h5 className="text-sky-500 text-base font-semibold">Select Item</h5>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.campaign_id}
                className="flex flex-wrap justify-between items-center w-full border-b border-slate-200 dark:border-slate-700 py-6"
              >
                <h5 className="flex items-start w-2/5 text-base font-normal dark:text-white text-slate-800 overflow-hidden h-[40px]">
                  {item.name}
                </h5>
                <p className="flex items-start text-sky-500 h-[40px]">
                  {formatPrice(item.amount)}
                </p>
                <div className="flex gap-x-4 w-full items-center justify-end">
                  <button
                    className="text-red-500 hover:text-red-700 flex items-center gap-x-2"
                    onClick={() => handleDeleteItem(item.campaign_id)}
                  >
                    <RiDeleteBin6Line size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap items-start w-full mb-2 rounded-xl dark:bg-slate-800 bg-white py-3">
              Empty Cart.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-4 mb-2 shadow-xl rounded-xl dark:bg-slate-800 bg-white p-6">
          <h5 className="text-sky-500 text-base font-semibold">
            Your Information
          </h5>
          {status !== "authenticated" && (
            <div className="flex flex-col mb-4">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="border p-2 rounded mb-2 focus:outline"
              />
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
              />
              <label>No Hp</label>
              {/* <input
                type="text"
                value={phone}
                placeholder="No Handphone"
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded"
              /> */}
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={(setValue) => setPhone(setValue)}
                className="border p-2 rounded"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-4 mb-2 shadow-xl rounded-xl dark:bg-slate-800 bg-white p-6">
          <h5 className="text-sky-500 text-base font-semibold">
            Select Payment
          </h5>
          <div>
            <select
              value={selectedPaymentChannel || ""}
              onChange={handleSelectPaymentChannel}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              {paymentChannels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.payment_channel_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-[384px] flex flex-col h-full justify-between shadow-xl rounded-xl dark:bg-slate-800 bg-white p-6 mt-10">
        <h1 className="text-normal font-semibold mb-6 text-sky-500">
          Checkout
        </h1>
        <div className="flex flex-row w-full justify-between mb-3">
          <p>Total</p>
          <p>{formatPrice(calculateTotalPrice())}</p>
        </div>
        <button
          onClick={handleDonateNow}
          className="bg-sky-500 text-white p-2 rounded w-full flex gap-x-2 justify-center items-center"
        >
          <FaOpencart /> Pay Now
        </button>
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default Checkout;
