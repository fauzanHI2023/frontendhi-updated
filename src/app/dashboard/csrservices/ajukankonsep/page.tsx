"use client"
import React, { useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookCheck, ListChecks, ArrowDown, OctagonAlert, ClipboardPlus, ArrowUp } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

const Page: React.FC = () => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const { data: session, status, update }: any = useSession();
  const csrStatus = session?.user?.csr_status;

  const handleActivateCSR = async () => {
    setError(""); // Clear previous errors

    try {
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update/${session?.user?.phpDonorData[0].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            csr_status: 1,
          }),
        }
      );

      const data = await response.json();
      // console.log("Response status:", response.status);
      // console.log("Response data:", data);

      if (!response.ok) {
        setError("Failed to update user data");
        return;
      }

      // Update session
      await update({
        csr_status: 1,
      });

    } catch (error) {
      setError("An error occurred while updating data");
    }
  };
  

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box flex flex-col gap-y-5 shadow-xl rounded-xl dark:bg-slate-900 bg-white">
          {csrStatus === 0 || csrStatus === null ? (
            <div className="status-denied">
              <button onClick={handleActivateCSR}>
                Apakah anda ingin mengaktifkan fitur CSR?
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="status-open">
              <Tabs defaultValue="ajukankonsep" className="w-full">
                <TabsList className="w-full flex flex-row justify-start p-6">
                  <TabsTrigger value="ajukankonsep" className="w-1/3">
                    <BookCheck className="mr-2 h-4 w-4" /> Ajukan Proposal
                  </TabsTrigger>
                  <TabsTrigger value="lihatkonsep" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Lihat Riwayat Proposal
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ajukankonsep" className="mt-3 p-6">
                    <form action="">
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-600 dark:text-slate-200 text-sm font-base mb-2">
                                Nama Instansi/Yayasan/Perusahaan/Komunitas
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-600 dark:text-slate-200 text-sm font-base mb-2">
                                Judul Proposal
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-600 dark:text-slate-200 text-sm font-base mb-2">
                                Deskripsi Proposal
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-600 dark:text-slate-200 text-sm font-base mb-2">
                                Upload Profil/Legalitas
                            </label>
                            <input
                                type="file"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-gray-600 dark:text-slate-200 text-sm font-base mb-2">
                                Upload Ide Proposal
                            </label>
                            <input
                                type="file"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-row justify-end">
                            <button
                                type="submit"
                                className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-sky-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="lihatkonsep" className="mt-3 bg-[#f5f7fe]">
                    <div className="flex flex-col gap-y-6 py-4 px-12 pb-12"> 
                        <h6 className="text-slate-500 text-sm font-semibold">Riwayat Ajukan Proposal</h6>
                        <div className="flex flex-col gap-y-6 ">
                            <Accordion type="single" className="flex flex-col gap-y-6" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-amber-100 p-3 rounded-3xl">
                                                <OctagonAlert className="text-amber-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Proposal 1
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 text-sm">Belum Sesuai</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-sky-500">Ubah</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800">Proposal 1</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Tanggal Pengajuan</label>
                                                <h6 className="text-slate-800">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Status</label>
                                                <h6 className="text-slate-800">Belum Sesuai</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Proposal</label>
                                                <h6 className="text-slate-800">Tidak Ada</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Laporan</label>
                                                <h6 className="text-slate-800">Tidak Ada</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 text-xs italic">*Pengajuan tersimpan di database Human Initiative</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-cyan-100 p-3 rounded-3xl">
                                                <ClipboardPlus className="text-cyan-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Proposal 2
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 text-sm">Pengajuan Proposal</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-sky-500">Ubah</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800">Proposal 2</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Tanggal Pengajuan</label>
                                                <h6 className="text-slate-800">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Status</label>
                                                <h6 className="text-slate-800">Pengajuan Proposal</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Review</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Laporan</label>
                                                <h6 className="text-slate-800">Belum Ada</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 text-xs italic">*Donor melakukan review terhadap Proposal yang diajukan oleh Human Initiative</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-green-100 p-3 rounded-3xl">
                                                <BookCheck className="text-green-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Proposal 3
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 text-sm">Diterima</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-sky-500">Ubah</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800">Proposal 3</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Tanggal Pengajuan</label>
                                                <h6 className="text-slate-800">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Status</label>
                                                <h6 className="text-slate-800">Diterima</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Proposal</label>
                                                <h6 className="text-slate-800">Sedang Dibuat</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 w-[150px]">Laporan</label>
                                                <h6 className="text-slate-800">Belum Ada</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 text-xs italic">*Human Initiative membuat pengajuan Proposal Program</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Page;
