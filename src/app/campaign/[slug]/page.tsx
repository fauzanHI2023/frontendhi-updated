"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCampaign } from "@/lib/donation/campaign/auth-campaign";
import { inputCart } from "@/lib/donation/transaction/auth-cart";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import { BsFillCollectionFill } from "react-icons/bs";
import { TbLayoutDistributeHorizontal } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { MdAreaChart } from "react-icons/md";
import bg from "../../../../public/DSC04008-2048x1365.jpg";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
interface Campaigns {
  id: number;
  campaign_name: string;
  campaign_description: string;
  target_donation: string;
  donation_collected: string;
  amount_distributed: string;
  support: string;
  slug: string;
}

const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<Campaigns | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      const cookieExists = document.cookie
        .split(";")
        .some((cookie) => cookie.trim().startsWith("osscart="));

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
    if (rawAmount && post?.id) {
      const cookiesId = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("osscart="))
        ?.split("=")[1];

      if (cookiesId) {
        // Menyimpan data ke localStorage
        const cartData = {
          cookies_id: cookiesId,
          campaign_id: post?.id, // Ganti sesuai dengan campaign_id yang dibutuhkan
          quantity: 1, // Quantity is fixed to 1 for each donation
          amount: rawAmount, // Set the amount correctly
        };

        // Retrieve existing data from localStorage or initialize an empty array
        const storedData = JSON.parse(localStorage.getItem("osscart") || "[]");
        const updatedCart = [...storedData, cartData];

        localStorage.setItem("osscart", JSON.stringify(updatedCart));
        setCartItems(updatedCart); // Update context

        // Memanggil inputCart API
        inputCart(
          cartData.cookies_id,
          cartData.campaign_id,
          cartData.quantity,
          cartData.amount
        )
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

  // Definisikan fungsi truncateAndStripHtml sebelum digunakan
  const stripHtml = (html: string) => {
    if (typeof window !== "undefined") {
      // Untuk lingkungan client-side
      const doc = new DOMParser().parseFromString(html, "text/html");
      const text = doc.body.textContent || "";

      // Hapus karakter "rn" atau variasinya
      return text.replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
    }

    // Fallback untuk SSR (menghapus HTML tag dan karakter \r\n)
    return html
      .replace(/<[^>]*>?/gm, "") // Hapus semua tag HTML
      .replace(/(\r\n|\n|\r|rn)+/g, " ") // Hapus karakter \r\n dan variasinya
      .trim(); // Hapus spasi ekstra di awal/akhir
  };

  // Pemakaian dalam useEffect
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        console.warn("Missing id in URL");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchCampaign();

        if (data?.status === "true") {
          // Proses semua campaign_description untuk menghapus tag HTML dan karakter \r\n
          const processedPosts: Campaigns[] = data.data.map(
            (post: Campaigns) => ({
              ...post,
              campaign_description: stripHtml(post.campaign_description), // Hapus HTML dan karakter \r\n
            })
          );

          // Cari post berdasarkan ID
          const foundPost = processedPosts.find(
            (post: Campaigns) => post.slug === slug
          );

          if (foundPost) {
            setPost(foundPost);
          } else {
            console.warn("Post not found for ID:");
            setPost(null);
          }
        } else {
          console.error("Invalid response status:", data.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found. Please check the URL or ID.</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const processContent = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, "<br>");
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align:center;"><img$1 style="margin:1rem auto; max-width: 100%; heigh: auto;"/></div>`
    );
    return processedHtml;
  };

  return (
    <main className="flex flex-col text-center justify-center items-center sm:py-0 sm:pb-36 py-12 w-full">
      <header
        className="flex flex-col justify-center items-center bg-cover bg-center sm:h-[500px] h-16 relative bg-gradient-to-r from-cyan-500/50 to-blue-500/50"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
        }}
      >
        <h1 className="text-4xl font-semibold text-white leading-[3.5rem] mb-4">
          {post.campaign_name}
        </h1>
      </header>
      <div className="sm:w-8/12 sm:max-w-[1430px] mx-auto mx-16 relative">
        <div className="grid grid-cols-4 gap-4 mt-[-2rem]">
          <div className="flex flex-col gap-x-4 py-4 px-4 shadow-lg rounded-lg bg-white">
            <div className="flex flex-row justify-center items-center gap-x-2">
              <span className="text-sky-700 text-lg ">
                <BsFillCollectionFill className="" />
              </span>
              {formatCurrency(post.donation_collected)}
            </div>
            <p className="text-sm font-normal text-sky-700">
              Donation Collected
            </p>
          </div>
          <div className="flex flex-col gap-x-4 py-4 px-4 shadow-lg rounded-lg bg-white">
            <div className="flex flex-row justify-center items-center gap-x-2">
              <span className="text-sky-700 text-lg ">
                <TbLayoutDistributeHorizontal className="" />
              </span>
              {formatCurrency(post.amount_distributed)}
            </div>
            <p className="text-sm font-normal text-sky-700">
              Amount Distributed
            </p>
          </div>
          <div className="flex flex-col gap-x-4 py-4 px-4 shadow-lg rounded-lg bg-white">
            <div className="flex flex-row justify-center items-center gap-x-2">
              <span className="text-sky-700 text-lg ">
                <FaUserAlt className="" />
              </span>
              {post.support}
            </div>
            <p className="text-sm font-normal text-sky-700">Donor</p>
          </div>
          <div className="flex flex-col gap-x-4 py-4 px-4 shadow-lg rounded-lg bg-white">
            <div className="flex flex-row justify-center items-center gap-x-2">
              <span className="text-sky-700 text-lg ">
                <MdAreaChart className="" />
              </span>
              {formatCurrency(post.target_donation)}
            </div>
            <p className="text-sm font-normal text-sky-700">Target Donation</p>
          </div>
        </div>
        <form className="p-4 bg-white dark:bg-slate-200">
          <div className="grid grid-cols-6 gap-4 mb-4">
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
          <div className="flex flex-row gap-x-4">
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter Donation Amount"
              className="w-4/5 p-3 border border-gray-300 rounded-lg dark:text-slate-600"
            />
            <button
              type="button"
              onClick={handleDonasiClick}
              className="w-1/5 mt-4 py-3 text-white bg-sky-600 rounded-xl"
            >
              Donate
            </button>
          </div>
          {/* <div className="mt-4">
                    <h4>Cookies: {cookies || "Fetching..."}</h4>
                  </div> */}
        </form>
        <div
          className="prose text-justify max-w-none leading-9 text-base text-[#666]"
          dangerouslySetInnerHTML={{
            __html: processContent(post.campaign_description),
          }}
        />
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default PostDetail;
