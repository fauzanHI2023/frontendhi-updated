"use client"
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Baby, HandHelping } from 'lucide-react';
import { GetPendingTransaction, GetSuccessTransaction } from '@/lib/auth-csr';
import { useSession } from 'next-auth/react';

const RiwayatDonasi: React.FC = () => {
  const { data: session } = useSession();
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [successTransactions, setSuccessTransactions] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchPendingTransactions = async () => {
        const data = await GetPendingTransaction(session.user.id);
        setPendingTransactions(data.transactions || []);
      };

      const fetchSuccessTransactions = async () => {
        const data = await GetSuccessTransaction(session.user.id);
        setSuccessTransactions(data.transactions || []);
      };

      fetchPendingTransactions();
      fetchSuccessTransactions();
    }
  }, [session?.user?.id]);

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow rounded-xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">Riwayat Donasi</h5>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="w-full flex flex-row">
              <TabsTrigger value="pending" className="w-1/3">
                <Home className="mr-2 h-4 w-4" /> Belum Bayar
              </TabsTrigger>
              <TabsTrigger value="paid" className="w-1/3">
                <Baby className="mr-2 h-4 w-4" /> Selesai
              </TabsTrigger>
              <TabsTrigger value="cancel" className="w-1/3">
                <HandHelping className="mr-2 h-4 w-4" /> Dibatalkan
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="py-5">
              <h3>Belum Bayar</h3>
              {pendingTransactions.length > 0 ? (
                <ul>
                  {pendingTransactions.map((transaction, index) => (
                    <li key={index} className="transaction-item">
                      <img src={transaction.product_img || '/placeholder.png'} alt={transaction.name} className="product-img" />
                      <p>{transaction.name}</p>
                      <p>{transaction.category_program}</p>
                      <p>{transaction.transaction_time}</p>
                      <p>{transaction.gross_amount}</p>
                      <p>{transaction.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending transactions</p>
              )}
            </TabsContent>
            <TabsContent value="paid">
              <h3>Selesai</h3>
              {successTransactions.length > 0 ? (
                <div>
                  {successTransactions.map((transaction, index) => (
                    <div key={index} className="flex flex-row transaction-item">
                      <div className="flex flex">
                        <img src={transaction.product_img || '/placeholder.png'} alt={transaction.name} className="product-img" />
                      </div>
                      <div className="flex">
                        <div>
                          <p>{transaction.name}</p>
                          <p>{transaction.status}</p>
                        </div>
                        <div>
                          <p>{transaction.category_program}</p>
                          <p>{transaction.transaction_time}</p>
                          <p>{transaction.gross_amount}</p>
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
              <h3>Dibatalkan</h3>
              {/* Display canceled transactions if needed */}
            </TabsContent>
          </Tabs>
        </div>       
      </main>   
    </DashboardLayout>
  );
};

export default RiwayatDonasi;
