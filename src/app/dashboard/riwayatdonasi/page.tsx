"use client";
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-fe';
import { BookCheck, ListChecks, BookmarkX } from 'lucide-react';
import { GetPendingTransaction, GetSuccessTransaction, GetCancelTransaction } from '@/lib/auth-csr';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Transaction {
  product_img: string;
  name: string;
  category_program: string;
  status: string;
  transaction_time: string;
  gross_amount: string;
}

const RiwayatDonasi: React.FC = () => {
  const session: any = useSession();
  const user: {
    id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    phpDonorData?: any[];
  } = session?.data?.user || {};
  const phpDonorId = user?.phpDonorData?.[0]?.id;

  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [successTransactions, setSuccessTransactions] = useState<Transaction[]>([]);
  const [cancelTransactions, setCancelTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImageUrl = async (key: string): Promise<string> => {
      const response = await fetch(`/api/getImage?key=${key}`);
      const data = await response.json();
      return data.url;
    };

    const fetchTransactionsWithImages = async (fetchFunction: () => Promise<{ success: boolean, transactions: Transaction[] }>, setFunction: React.Dispatch<React.SetStateAction<Transaction[]>>) => {
      try {
        const response = await fetchFunction();
        console.log('API response:', response); // Debugging line
        if (response && response.transactions) {
          const transactionsWithImages = await Promise.all(
            response.transactions.map(async (transaction: Transaction) => {
              if (transaction.product_img) {
                transaction.product_img = await fetchImageUrl(transaction.product_img);
              }
              return transaction;
            })
          );
          setFunction(transactionsWithImages);
        } else {
          console.error('Error fetching transactions: invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (phpDonorId) {
      fetchTransactionsWithImages(() => GetPendingTransaction(phpDonorId), setPendingTransactions);
      fetchTransactionsWithImages(() => GetSuccessTransaction(phpDonorId), setSuccessTransactions);
      fetchTransactionsWithImages(() => GetCancelTransaction(phpDonorId), setCancelTransactions);
    }
  }, [phpDonorId]);

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow-xl rounded-xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">Riwayat Donasi</h5>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="w-full flex flex-row">
                <TabsTrigger value="pending" className="w-1/3">
                  <BookCheck className="mr-2 h-4 w-4" /> Belum Bayar
                </TabsTrigger>
                <TabsTrigger value="paid" className="w-1/3">
                  <ListChecks className="mr-2 h-4 w-4" /> Selesai
                </TabsTrigger>
                <TabsTrigger value="cancel" className="w-1/3">
                  <BookmarkX className="mr-2 h-4 w-4" /> Dibatalkan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-3">
                {pendingTransactions.length > 0 ? (
                  <div className="flex flex-col gap-y-10 mt-6">
                    {pendingTransactions.map((transaction, index) => (
                      <div key={index} className="flex flex-row w-[90%] gap-x-8 transaction-item">
                        <div className="flex w-1/4">
                          <Image src={transaction.product_img || '/../../public/bg-register.jpg'} alt={transaction.name} width={200} height={200} className="object-cover w-[200px] h-[200px] rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center w-3/4 gap-y-12">
                          <div className="flex flex-row justify-between items-center">
                            <p className="w-3/5 font-semibold text-lg text-gray-700 dark:text-white overflow-hidden h-[60px]">{transaction.name}</p>
                            <p className="w-[150px] px-4 py-2 rounded-3xl text-center border border-blue-500 bg-blue-50 dark:bg-slate-800 text-blue-500">{transaction.status}</p>
                          </div>
                          <div className="flex flex-row justify-between items-center w-3/5">
                            <p className="text-blue-500 capitalize">{transaction.category_program || 'sekali'}</p>
                            <p className="text-stone-400">{transaction.transaction_time}</p>
                            <p className="text-stone-600">{transaction.gross_amount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No pending transactions</p>
                )}
              </TabsContent>
              <TabsContent value="paid" className="mt-3">
                {successTransactions.length > 0 ? (
                  <div className="flex flex-col gap-y-10 mt-6">
                    {successTransactions.map((transaction, index) => (
                      <div key={index} className="flex flex-row w-[90%] gap-x-8 transaction-item">
                        <div className="flex w-1/4">
                          <Image src={transaction.product_img || '/../../public/bg-register.jpg'} alt={transaction.name} width={200} height={200} className="object-cover w-[200px] h-[200px] rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center w-3/4 gap-y-12">
                          <div className="flex flex-row justify-between items-center">
                            <p className="w-3/5 font-semibold text-lg text-gray-700 dark:text-white overflow-hidden h-[60px]">{transaction.name}</p>
                            <p className="w-1/5 px-4 py-2 rounded-3xl text-center bg-blue-500 text-white">{transaction.status}</p>
                          </div>
                          <div className="flex flex-row justify-between items-center w-3/5">
                            <p className="text-blue-500 capitalize">{transaction.category_program || 'sekali'}</p>
                            <p className="text-stone-400">{transaction.transaction_time}</p>
                            <p className="text-stone-600">{transaction.gross_amount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No successful transactions</p>
                )}
              </TabsContent>
              <TabsContent value="cancel">
                {cancelTransactions.length > 0 ? (
                  <div className="flex flex-col gap-y-10 mt-6">
                    {cancelTransactions.map((transaction, index) => (
                      <div key={index} className="flex flex-row w-[90%] gap-x-8 transaction-item">
                        <div className="flex w-1/4">
                          <Image src={transaction.product_img || '/../../public/bg-register.jpg'} alt={transaction.name} width={200} height={200} className="object-cover w-[200px] h-[200px] rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center w-3/4 gap-y-12">
                          <div className="flex flex-row justify-between items-center">
                            <p className="w-3/5 font-semibold text-lg text-gray-700 dark:text-white overflow-hidden h-[60px]">{transaction.name}</p>
                            <p className="w-1/5 px-4 py-2 rounded-3xl text-center border border-stone-600 bg-stone-100 text-stone-600">{transaction.status}</p>
                          </div>
                          <div className="flex flex-row justify-between items-center w-3/5">
                            <p className="text-blue-500 capitalize">{transaction.category_program || 'sekali'}</p>
                            <p className="text-stone-400">{transaction.transaction_time}</p>
                            <p className="text-stone-600">{transaction.gross_amount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No successful transactions</p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default RiwayatDonasi;
