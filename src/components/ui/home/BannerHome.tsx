"use client";

import React, { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { inputCart } from "@/lib/donation/transaction/auth-cart";
import AOS from "aos";
import "aos/dist/aos.css";
import PopupNotif from "../utility/PopupNotif";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const BannerHome: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>(""); 
  const [rawAmount, setRawAmount] = useState<number | null>(null);
  const { cartItems, setCartItems } = useCart();
  const [cookies, setCookies] = useState<string | null>(null); 
  const router = useRouter();

  const nominalOptions = [
    { label: "Rp 50.000", value: 50000.0 },
    { label: "Rp 100.000", value: 100000.0 },
    { label: "Rp 250.000", value: 250000.0 },
    { label: "Rp 500.000", value: 500000.0 },
    { label: "Rp 1.000.000", value: 1000000.0 },
    { label: "Rp 2.000.000", value: 2000000.0 },
  ];

  const [notifMessage, setNotifMessage] = useState("");

  useEffect(() => {
    AOS.init();

    const getCookies = () => {
      const allCookies = document.cookie;
      setCookies(allCookies || "Tidak ada cookies ditemukan");
    };

    const checkAndCreateCookie = () => {
      const cookieExists = document.cookie.split(";").some((cookie) => cookie.trim().startsWith("osscart="));

      if (!cookieExists) {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 2);
        document.cookie = `osscart=true; expires=${expirationDate.toUTCString()}; path=/`;
        setCookies("osscart cookie has been created.");
      } else {
        setCookies("osscart cookie already exists.");
      }
    };

    checkAndCreateCookie();
    getCookies();
  }, []);

  const handleAmountClick = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount(formatCurrency(value.toString()));
    setRawAmount(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(value);

    setCustomAmount(formattedValue);
    setRawAmount(parseInt(value) || null);

    const match = nominalOptions.find(
      (option) => option.value === parseInt(value)
    );
    setSelectedAmount(match ? match.value : null);
  };

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || "0");
    return `Rp ${parsedValue.toLocaleString("id-ID")}`;
  };

  const handleDonasiClick = () => {
    // Ensure rawAmount is valid
    if (rawAmount) {
      const cookiesId = document.cookie.split(";").find(cookie => cookie.trim().startsWith("osscart="))?.split("=")[1];
  
      if (cookiesId) {
        // Menyimpan data ke localStorage
        const cartData = {
          cookies_id: cookiesId,
          campaign_id: 2, // Ganti sesuai dengan campaign_id yang dibutuhkan
          quantity: 1, // Quantity is fixed to 1 for each donation
          amount: rawAmount, // Set the amount correctly
        };
  
        // Retrieve existing data from localStorage or initialize an empty array
        const storedData = JSON.parse(localStorage.getItem("osscart") || "[]");
        const updatedCart = [...storedData, cartData];

        localStorage.setItem("osscart", JSON.stringify(updatedCart));
        setCartItems(updatedCart); // Update context
  
        // Memanggil inputCart API
        inputCart(cartData.cookies_id, cartData.campaign_id, cartData.quantity, cartData.amount)
          .then((response) => {
            setNotifMessage("Donasi berhasil!");
            router.push(`/checkout`);
          })
          .catch((error) => {
            setNotifMessage("Terjadi kesalahan saat melakukan donasi.");
          });
      } else {
        setNotifMessage("Cookie 'osscart' tidak ditemukan.");
      }
    }
  };
  

  return (
    <section className="flex flex-row w-full h-screen sm:p-24 p-6 sm:pt-24 pt-24 dark:bg-hero-pattern bg-hero-white sm:bg-cover bg-cover bg-center bg-no-repeat">
      <div className="flex sm:flex-row flex-col w-full">
        <div
          className="flex flex-col sm:w-1/2 w-full justify-center sm:pb-0 pb-8"
          data-aos="fade-left"
        >
          <h3 className="font-bold sm:text-5xl text-2xl sm:pb-10 pb-3">
            Helps <span className="font-black text-sky-600">connect</span> those
            who care with those who need help.
          </h3>
          <h6 className="font-normal text-sm font-base">
            Lets work together to help our brothers and sisters who are being
            hit by a disaster. One rupee from you is definitely valuable to
            them.
          </h6>
        </div>
        <div
          className="flex sm:w-1/2 w-full items-center justify-center"
          data-aos="fade-right"
        >
          <TabGroup className="w-2/3">
            <TabList className="w-full mb-4">
              <Tab className="transition duration-150 ease-in w-full rounded-[23px] py-3 text-center dark:bg-white bg-white dark:data-[selected]:bg-sky-950 data-[selected]:bg-sky-600 dark:text-blue-900 text-sky-600 dark:data-[selected]:text-white data-[selected]:text-white">
                One Time Donation
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                className="flex flex-col text-sm transition duration-300 ease-in"
                data-aos="fade-left"
                data-aos-duration="500"
              >
                <div className="dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-4 text-center rounded-tl-[23px] rounded-tr-[23px]">
                  <h4>Choose Your Donation Amount</h4>
                </div>
                <form className="p-4 bg-white dark:bg-slate-200">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {nominalOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAmountClick(option.value)}
                        className={`p-3 text-center rounded-3xl transition ${
                          selectedAmount === option.value
                            ? "bg-sky-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter Amount"
                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={handleDonasiClick}
                    className="w-full mt-4 py-3 text-white bg-sky-600 rounded-full"
                  >
                    Donate Now
                  </button>
                  {/* <div className="mt-4">
                    <h4>Cookies: {cookies || "Fetching..."}</h4>
                  </div> */}
                </form>
                <div className="flex flex-col dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-8 text-center rounded-bl-[23px] rounded-br-[23px]">
                  <h4>
                    The donations you make are used to run the programs that
                    have been prepared by the Human Initiative. If you want to
                    donate to a specific program please click{" "}
                    <a href="" className="font-extrabold">
                      here​.
                    </a>
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
