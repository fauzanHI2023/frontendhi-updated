'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Home, Baby, HandHelping, School } from 'lucide-react';
import { DonateIndividuDisaster, DonateIndividuChildren, DonateIndividuEmpowerment, DonateIndividuInfrastructure } from '@/lib/auth-donasi';
import Swal from 'sweetalert2';

const Page: React.FC = () => {
  const [programIndividuDisaster, setProgramIndividuDisaster] = useState<any[]>([]);
  const [programIndividuChildren, setProgramIndividuChildren] = useState<any[]>([]);
  const [programIndividuEmpowerment, setProgramIndividuEmpowerment] = useState<any[]>([]);
  const [programIndividuInfrastruktur, setProgramIndividuInfrastruktur] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImageUrl = async (key: string): Promise<string> => {
      const response = await fetch(`/api/getImage?key=${key}`);
      const data = await response.json();
      return data.url;
    };

    const fetchData = async (fetchFunction: Function, setFunction: Function) => {
      try {
        const response = await fetchFunction();
        if (response.status === 'success') {
          const dataWithImages = await Promise.all(
            response.data.map(async (item: any) => {
              const imageUrl = await fetchImageUrl(item.product.product_img);
              return { ...item, product: { ...item.product, product_img: imageUrl } };
            })
          );
          setFunction(dataWithImages);
        } else {
          console.error('Error fetching Program: status not successful');
        }
      } catch (error) {
        console.error('Error fetching Program:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(DonateIndividuDisaster, setProgramIndividuDisaster);
    fetchData(DonateIndividuChildren, setProgramIndividuChildren);
    fetchData(DonateIndividuEmpowerment, setProgramIndividuEmpowerment);
    fetchData(DonateIndividuInfrastructure, setProgramIndividuInfrastruktur);
  }, []);

  const addToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
      position: 'center',
      icon: 'success',
      iconColor: '#75C8FB',
      title: 'Donasi berhasil ditambahkan',
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const calculateProgress = (grossAmount: number): number => {
    const min = 50000;
    const max = 50000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow rounded-xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">Donasi Individu</h5>
          <Tabs defaultValue="disaster" className="w-full">
            <TabsList className="w-full flex flex-wrap">
              <TabsTrigger value="disaster" className="w-1/4">
                <Home className="mr-2 h-4 w-4" /> Disaster
              </TabsTrigger>
              <TabsTrigger value="children" className="w-1/4">
                <Baby className="mr-2 h-4 w-4" /> Children
              </TabsTrigger>
              <TabsTrigger value="empowerment" className="w-1/4">
                <HandHelping className="mr-2 h-4 w-4" /> Empowerment
              </TabsTrigger>
              <TabsTrigger value="infrastruktur" className="w-1/4">
                <School className="mr-2 h-4 w-4" /> Infrastruktur
              </TabsTrigger>
            </TabsList>
            <TabsContent value="disaster" className="py-5">
              {loading ? (
                <p>Loading Program Disaster...</p>
              ) : (
                programIndividuDisaster.length > 0 ? (
                  programIndividuDisaster.map(({ product, transactionCount, totalGrossAmount }) => (
                    <div key={product.product_id} className="flex flex-col gap-y-4 w-1/3 mb-4">
                      <div className="w-full">
                        <Image alt={product.name} src={product.product_img} width={200} height={200} className="w-full" />
                      </div>
                      <div className="flex flex-col gap-y-3 w-full">
                        <h5 className="text-base font-semibold dark:text-white text-slate-900">
                          {product.name}
                        </h5>
                        <label className="flex flex-row justify-between w-full cursor-pointer text-blue-800 font-semibold">
                          <p>Rp50.000</p>
                          <p>Rp50.000.000</p>
                        </label>
                        <Progress value={calculateProgress(totalGrossAmount)} />
                        <p className="text-sm font-semibold text-blue-900">{transactionCount} orang mendukung program ini</p>
                        <button onClick={() => addToCart(product)} className="bg-blue-800 text-white p-2 rounded">Tambah Donasi</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada Program Disaster</p>
                )
              )}
            </TabsContent>
            <TabsContent value="children">
              {loading ? (
                <p>Loading Program Children...</p>
              ) : (
                programIndividuChildren.length > 0 ? (
                  programIndividuChildren.map(({ product, transactionCount, totalGrossAmount }) => (
                    <div key={product.product_id} className="flex flex-col gap-y-4 w-1/3 mb-4">
                      <div className="w-full">
                        <Image alt={product.name} src={product.product_img} width={200} height={200} className="w-full" />
                      </div>
                      <div className="flex flex-col gap-y-3 w-full">
                        <h5 className="text-base font-semibold dark:text-white text-slate-900">
                          {product.name}
                        </h5>
                        <label className="flex flex-row justify-between w-full cursor-pointer text-blue-800 font-semibold">
                          <p>Rp50.000</p>
                          <p>Rp50.000.000</p>
                        </label>
                        <Progress value={calculateProgress(totalGrossAmount)} />
                        <p className="text-sm font-semibold text-blue-900">{transactionCount} orang mendukung program ini</p>
                        <button onClick={() => addToCart(product)} className="bg-blue-800 text-white p-2 rounded">Tambah Donasi</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada Program Children</p>
                )
              )}
            </TabsContent>
            <TabsContent value="empowerment">
              {loading ? (
                <p>Loading Program Empowerment...</p>
              ) : (
                programIndividuEmpowerment.length > 0 ? (
                  programIndividuEmpowerment.map(({ product, transactionCount, totalGrossAmount }) => (
                    <div key={product.product_id} className="flex flex-col gap-y-4 w-1/3 mb-4">
                      <div className="w-full">
                        <Image alt={product.name} src={product.product_img} width={200} height={200} className="w-full" />
                      </div>
                      <div className="flex flex-col gap-y-3 w-full">
                        <h5 className="text-base font-semibold dark:text-white text-slate-900">
                          {product.name}
                        </h5>
                        <label className="flex flex-row justify-between w-full cursor-pointer text-blue-800 font-semibold">
                          <p>Rp50.000</p>
                          <p>Rp50.000.000</p>
                        </label>
                        <Progress value={calculateProgress(totalGrossAmount)} />
                        <p className="text-sm font-semibold text-blue-900">{transactionCount} orang mendukung program ini</p>
                        <button onClick={() => addToCart(product)} className="bg-blue-800 text-white p-2 rounded">Tambah Donasi</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada Program Empowerment</p>
                )
              )}
            </TabsContent>
            <TabsContent value="infrastruktur">
            {loading ? (
                <p>Loading Program Infrastruktur...</p>
              ) : (
                programIndividuInfrastruktur.length > 0 ? (
                  programIndividuInfrastruktur.map(({ product, transactionCount, totalGrossAmount }) => (
                    <div key={product.product_id} className="flex flex-col gap-y-4 w-1/3 mb-4">
                      <div className="w-full">
                        <Image alt={product.name} src={product.product_img} width={200} height={200} className="w-full" />
                      </div>
                      <div className="flex flex-col gap-y-3 w-full">
                        <h5 className="text-base font-semibold dark:text-white text-slate-900">
                          {product.name}
                        </h5>
                        <label className="flex flex-row justify-between w-full cursor-pointer text-blue-800 font-semibold">
                          <p>Rp50.000</p>
                          <p>Rp50.000.000</p>
                        </label>
                        <Progress value={calculateProgress(totalGrossAmount)} />
                        <p className="text-sm font-semibold text-blue-900">{transactionCount} orang mendukung program ini</p>
                        <button onClick={() => addToCart(product)} className="bg-blue-800 text-white p-2 rounded">Tambah Donasi</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada Program Empowerment</p>
                )
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Page;
