"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaClock, FaRegCopy } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import Countdown from "react-countdown";

const PaymentBankTransfer: React.FC = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams?.get("transaction_id") || "";
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatToRupiah = (
    amount: number
  ): { main: string; lastThree: string } => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);

    const cleanAmount = formatted.replace(",00", "");
    const lastThree = cleanAmount.slice(-3);
    const main = cleanAmount.slice(0, -3);
    return { main, lastThree };
  };

  const handleCopyAccountNo = () => {
    if (transactionDetails?.payment_channel?.account_no) {
      navigator.clipboard.writeText(
        transactionDetails.payment_channel.account_no
      );
      setNotifMessage("Copied");
    }
  };

  useEffect(() => {
    if (transactionId) {
      const fetchTransactionDetails = async () => {
        try {
          const response = await fetch(
            `https://adminx.human-initiative.org/donation/create-transaction-api/get-transaction-bank?transaction_id=${transactionId}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setTransactionDetails(data.data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError("Error fetching transaction details");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactionDetails();
    } else {
      setLoading(false);
      setError("Transaction ID is missing");
    }
  }, [transactionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-red-500">Expired</span>;
    } else {
      return (
        <span className="bg-sky-300 rounded p-[2px] text-xs">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  let expirationTime = new Date();
  let expirationTimeWIB = new Date();
  let dueDateFormatted = "";

  if (transactionDetails && transactionDetails.transaction_date) {
    const parsedDate = Date.parse(transactionDetails.transaction_date);
    if (!isNaN(parsedDate)) {
      expirationTime = new Date(parsedDate);
      expirationTime.setHours(expirationTime.getHours() + 24);

      const utcOffset = expirationTime.getTimezoneOffset() * 60000;
      expirationTimeWIB = new Date(
        expirationTime.getTime() + utcOffset + 7 * 3600000
      );

      dueDateFormatted = expirationTimeWIB.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    } else {
      console.error("Invalid date format in transaction_date");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900 bg-gray-50">
      <div className="h-full h-96 w-2/5 py-4 px-6 mt-12">
        {transactionDetails && (
          <>
            {transactionDetails.status === "unpaid" && (
              <div className="flex flex-col justify-center items-center gap-2 mb-6">
                <span className="flex justify-center items-center bg-sky-100 w-36 h-36 rounded-full">
                  <FaClock
                    size={24}
                    className="text-sky-400 text-5xl w-20 h-20 "
                  />
                </span>
                <h5 className="text-lg font-medium text-sky-600">
                  Awaiting Payment{" "}
                  <Countdown
                    className="font-bold bg-sky-200 text-slate-800 p-2 rounded"
                    date={expirationTime}
                    renderer={renderer}
                  />
                </h5>
                <p className="text-gray-500 text-sm">
                  Due on {dueDateFormatted}
                </p>
                <div className="flex flex-row justify-center items-center mb-3">
                  <h1 className="text-xl font-bold dark:text-sky-600 text-sky-700">
                    Thank you {transactionDetails.full_name}
                  </h1>
                </div>
                <div className="flex flex-col gap-y-4 mb-6">
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="mr-2 font-base dark:text-white text-zinc-800">
                      Your Transaction ID
                    </span>
                    <span>{transactionDetails.transaction_no}</span>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="text-3xl font-bold">
                      {formatToRupiah(Number(transactionDetails.amount)).main}
                      <span className="text-sky-600">
                        {
                          formatToRupiah(Number(transactionDetails.amount))
                            .lastThree
                        }
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col w-full justify-center items-center p-8 border rounded-xl shadow-xl">
                    <span className="mr-2 font-base dark:text-white text-slate-700">
                      {transactionDetails.payment_channel.name}
                    </span>
                    <span className="text-2xl text-slate-600 font-semibold">
                      {transactionDetails.payment_channel.account_no}
                    </span>
                    <button
                      onClick={handleCopyAccountNo}
                      className="w-full flex flex-row justify-center gap-x-4 items-center mt-2 px-4 py-2 bg-gray-200 text-slate-700 rounded-md transition duration-300 ease-in hover:bg-sky-300 hover:text-white"
                    >
                      Copy <FaRegCopy />
                    </button>
                  </div>
                </div>
              </div>
              
            )}
            {(transactionDetails.status === "paid" ||
              transactionDetails.status === "confirmed") && (
              <div className="flex flex-col justify-center items-center gap-2 mb-6">
                <FaCheckDouble
                  size={24}
                  className="text-green-500 text-2xl w-20 h-20"
                />
                <h5 className="text-lg font-medium text-green-600">
                  Payment Successful
                </h5>
                <div className="flex flex-row justify-center items-center mb-3">
                  <h1 className="text-xl font-bold dark:text-sky-600 text-sky-700">
                    Thank you {transactionDetails.full_name}
                  </h1>
                </div>
                <div className="flex flex-col gap-y-4 mb-6">
                  <div className="flex flex-row w-full justify-center items-center">
                    <span className="mr-2 font-base dark:text-white text-zinc-800">
                      Your Transaction ID
                    </span>
                    <span>{transactionDetails.transaction_no}</span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-center items-center">
                    <span className="text-3xl text-sky-600 font-bold">
                      {formatToRupiah(Number(transactionDetails.amount)).main}
                      <span className="text-sky-600">
                        {
                          formatToRupiah(Number(transactionDetails.amount))
                            .lastThree
                        }
                      </span>
                    </span>
                  </div>
              </div>
            )}
          </>
        )}
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default PaymentBankTransfer;
