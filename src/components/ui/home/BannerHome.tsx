"use client";
import React, { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { productDonate } from "@/lib/auth-payment";
import PopupNotif from "../utility/PopupNotif";
import { motion } from "framer-motion";

interface User {
  id: number;
  full_name: string;
  email: string;
}

const BannerHome: React.FC = () => {
  const { data: session, status } = useSession();
  const router: any = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [userId, setUserId] = useState<number>(1); // Assuming user_id is 1 for now
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState("");

  useEffect(() => {
    AOS.init();

    if (status === "authenticated" && session) {
      const user = session.user as User;
      setUserId(user.id ?? 1);
      setFullName(user.full_name ?? "");
      setEmail(user.email ?? "");
    }

    const fetchProducts = async () => {
      try {
        const response = await productDonate();
        if (response.status === "success") {
          setProducts(response.data); // Mengakses properti data dari response
        } else {
          console.error("Error fetching products: status not successful");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [status, session, router]);

  useEffect(() => {
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
  }, []);

  const handleDonateNow = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedProductId === null) {
      setNotifMessage("Pilih produk terlebih dahulu.");
      return;
    }

    if (status !== "authenticated") {
      setNotifMessage("Silahkan Login terlebih dahulu untuk berdonasi.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://adminx.human-initiative.org/transaction/create-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            full_name: fullName,
            email: email,
            items: [
              {
                product_id: selectedProductId,
                quantity: 1, // Assuming quantity is 1 for now
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data); // Log response

      if (data.status === "success") {
        console.log("Order ID:", data.transaction_id); // Log order ID
        console.log("Snap Token:", data.snap_token); // Log snap token

        if (window.snap) {
          window.snap.pay(data.snap_token, {
            onSuccess: function (result: any) {
              console.log("Transaction successful", result);
              router.push(
                `/notification?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`
              );
            },
            onPending: function (result: any) {
              console.log("Transaction pending", result);
            },
            onError: function (result: any) {
              console.log("Transaction failed", result);
            },
            onClose: function () {
              console.log("Transaction popup closed");
            },
          });
        } else {
          console.error("Snap is not defined");
        }
      } else {
        console.error("Error creating transaction:", data.message);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const formatPrice = (price: number) => {
    return `Rp ${Number(price)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <section className="flex flex-row w-full h-screen sm:p-24 p-6 sm:pt-24 pt-24 dark:bg-hero-pattern bg-hero-white sm:bg-cover bg-cover bg-center bg-no-repeat">
      <div className="flex sm:flex-row flex-col w-full">
        <div
          className="flex flex-col sm:w-1/2 w-full justify-center sm:pb-0 pb-8"
          data-aos="fade-left"
        >
          <h3 className="font-bold sm:text-5xl text-2xl sm:pb-10 pb-3">
            Helps <span className="font-black text-sky-600">connect</span>{" "}
            those who care with those who need help.
          </h3>
          <h6 className="font-normal text-sm font-base">
            Lets work together to help our brothers and sisters who are being
            hit by a disaster. One upee from you is definitely valuable to them.
          </h6>
        </div>
        <div
          className="flex sm:w-1/2 w-full items-center justify-center"
          data-aos="fade-right"
        >
          <TabGroup className="w-2/3">
            <TabList className="w-full mb-4">
              <Tab className="transition duration-150 ease-in w-2/4 rounded-tl-[23px] rounded-bl-[23px] py-3 text-center dark:bg-white bg-sky-600 dark:data-[selected]:bg-sky-950 data-[selected]:bg-white dark:text-blue-900 text-white dark:data-[selected]:text-white data-[selected]:text-blue-900">
                Donasi Sekali
              </Tab>
              <Tab className="transition duration-150 ease-in w-2/4 rounded-tr-[23px] rounded-br-[23px] py-3 text-center dark:bg-white bg-sky-600 dark:data-[selected]:bg-sky-950 data-[selected]:bg-white dark:text-blue-900 text-white dark:data-[selected]:text-white data-[selected]:text-blue-900">
                Donasi Perbulan
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="flex flex-col text-sm transition duration-300 ease-in" data-aos="fade-left" data-aos-duration="500">
                <div className="dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-4 text-center rounded-tl-[23px] rounded-tr-[23px]">
                  <h4>Pilih jumlah yang akan diberikan per bulan</h4>
                </div>
                <form className="flex flex-wrap dark:bg-white bg-white p-4">
                  List Produk disini
                  <button
                    type="submit"
                    className="dark:text-white text-white w-full dark:bg-sky-950 bg-sky-600 rounded-[50px] py-3 px-4 text-center"
                  >
                    Donasi Sekarang
                  </button>
                </form>
                <div className="flex flex-col dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-8 text-center rounded-bl-[23px] rounded-br-[23px]">
                  <h4>
                    Donasi yang anda berikan digunakan untuk menjalankan program program yang telah disiapkan oleh Human Initiative.
                    Apabila anda ingin berdonasi program tertentu silakan klik <a href="">disini</a>
                  </h4>
                </div>
              </TabPanel>
              <TabPanel className="flex flex-col text-sm transition duration-150 ease-in" data-aos="fade-left" data-aos-duration="500">
                <div className="dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-4 text-center rounded-tl-[23px] rounded-tr-[23px]">
                  <h4>Pilih jumlah yang akan diberikan sekali</h4>
                </div>
                <form
                  className="flex flex-wrap gap-x-3 dark:bg-white bg-white p-4"
                  onSubmit={handleDonateNow}
                >
                  {loading ? (
                    <p>Loading products...</p>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.product_id} className="w-1/4 mb-4">
                        <input
                          type="radio"
                          name="product"
                          id={product.product_id}
                          value={product.product_id}
                          onChange={() =>
                            setSelectedProductId(product.product_id)
                          }
                          className="peer hidden"
                        />
                        <label
                          htmlFor={product.product_id}
                          className="flex flex-col items-center w-full cursor-pointer p-2 text-center rounded-3xl bg-slate-300 text-slate-600 peer-checked:bg-sky-600 peer-checked:text-white"
                        >
                          {formatPrice(product.price)}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                  <button
                    type="submit"
                    className="dark:text-white text-white w-full dark:bg-sky-950 bg-sky-600 rounded-[50px] py-3 px-4 text-center"
                  >
                    Donasi Sekarang
                  </button>
                </form>
                <div className="flex flex-col dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-8 text-center rounded-bl-[23px] rounded-br-[23px]">
                  <h4>
                    Donasi yang anda berikan digunakan untuk menjalankan program program yang telah disiapkan oleh Human Initiative.
                    Apabila anda ingin berdonasi program tertentu silakan klik <a href="">disini</a>
                  </h4>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </section>
  );
};

export default BannerHome;
