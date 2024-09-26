"use client"
import React, { useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-fe';
import { BookCheck, ListChecks, OctagonAlert, ClipboardPlus, BookmarkX, FileBarChart } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

const Page: React.FC = () => {
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
        <div className="box flex flex-col gap-y-5 border shadow rounded-xl dark:bg-slate-900 bg-white">
          {csrStatus === 0 || csrStatus === null ? (
            <div className="status-denied">
              <button onClick={handleActivateCSR}>
                Apakah anda ingin mengaktifkan fitur CSR?
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="status-open">
              <Tabs defaultValue="program" className="w-full">
                <TabsList className="w-full flex flex-row justify-start p-6">
                  <TabsTrigger value="program" className="w-1/3">
                    <BookCheck className="mr-2 h-4 w-4" /> Program
                  </TabsTrigger>
                  <TabsTrigger value="riwayatprogram" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Program Yang Saya Ikuti
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="program" className="mt-3 bg-[#f5f7fe] dark:bg-slate-800">
                    <div className="flex flex-col gap-y-6 py-4 px-12 pb-12">
                        <h6 className="text-slate-500 text-sm font-semibold">Program</h6>
                        <div className="grid grid-cols-4 gap-6">
                            <div className="flex flex-col mb-6 p-8 rounded-2xl bg-white dark:bg-slate-700">
                                <div></div>
                                <h6 className="text-sm font-light">Disaster</h6>
                                <h4 className="text-base font-semibold">Program 1</h4>
                            </div>
                            <div className="flex flex-col mb-6 p-8 rounded-2xl bg-white dark:bg-slate-700">
                                <div></div>
                                <h6 className="text-sm font-light">Children</h6>
                                <h4 className="text-base font-semibold">Program 2</h4>
                            </div>
                            <div className="flex flex-col mb-6 p-8 rounded-2xl bg-white dark:bg-slate-700">
                                <div></div>
                                <h6 className="text-sm font-light">Infrastruktur</h6>
                                <h4 className="text-base font-semibold">Program 3</h4>
                            </div>
                            <div className="flex flex-col mb-6 p-8 rounded-2xl bg-white dark:bg-slate-700">
                                <div></div>
                                <h6 className="text-sm font-light">Empowerment</h6>
                                <h4 className="text-base font-semibold">Program 4</h4>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="riwayatprogram" className="mt-3 bg-[#f5f7fe] dark:bg-slate-800">
                    <div className="flex flex-col gap-y-6 py-4 px-12 pb-12"> 
                        <h6 className="text-slate-500 text-sm font-semibold">Program yang diikuti</h6>
                        <div className="flex flex-col gap-y-6 ">
                            <Accordion type="single" className="flex flex-col gap-y-6" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-amber-100 p-3 rounded-3xl">
                                                <OctagonAlert className="text-amber-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Program 1
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 dark:text-white text-sm">Selesai</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-slate-500">Selesai</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Program 1</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Tanggal Bertemu</label>
                                                <h6 className="text-slate-800 dark:text-white">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Jenis Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Children</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Status</label>
                                                <h6 className="text-slate-800 dark:text-white">Selesai</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Laporan</label>
                                                <h6 className="text-sky-500 cursor-pointer">Laporan.pdf</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 dark:text-white text-xs italic">*Pengajuan tersimpan di database Human Initiative</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-cyan-100 p-3 rounded-3xl">
                                                <ClipboardPlus className="text-cyan-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Program 2
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 dark:text-white text-sm">Belum Dihubungi</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-sky-500">Ubah Jadwal</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Program 2</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Tanggal Bertemu</label>
                                                <h6 className="text-slate-800 dark:text-white">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Jenis Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Infrastruktur</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Status</label>
                                                <h6 className="text-slate-800 dark:text-white">Belum Dihubungi</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Laporan</label>
                                                <h6 className="text-slate-800">Belum Ada</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 dark:text-white text-xs italic">*Donor melakukan review terhadap Proposal yang diajukan oleh Human Initiative</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="flex flex-row justify-between items-center rounded-xl bg-white dark:bg-slate-700 p-6">
                                        <div className="flex flex-row gap-x-4">
                                            <span className="bg-green-100 p-3 rounded-3xl">
                                                <BookCheck className="text-green-500"/>
                                            </span>
                                            <div className="flex flex-col gap-x-1">
                                                <h5>
                                                    Program 3
                                                </h5>
                                                <p className="text-slate-400 text-sm">
                                                    18 Juli, 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-slate-700 dark:text-white text-sm">Program Berlangsung</h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                                        <div className="flex flex-row justify-between items-center w-full mb-8">
                                            <h5 className="text-slate-500 text-normal font-semibold">Detail Program</h5>
                                            <button className="text-sky-500">Ubah Jadwal</button>
                                        </div>
                                        <div className="flex flex-wrap w-full">
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Nama Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Program 3</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Tanggal Bertemu</label>
                                                <h6 className="text-slate-800 dark:text-white">18 Juli 2018</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Jenis Program</label>
                                                <h6 className="text-slate-800 dark:text-white">Disaster</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Status</label>
                                                <h6 className="text-slate-800 dark:text-white">Program Berlangsung</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">File Proposal</label>
                                                <h6 className="text-sky-500 cursor-pointer">Proposal.pdf</h6>
                                            </div>
                                            <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                                                <label className="text-slate-600 dark:text-white w-[150px]">Laporan</label>
                                                <h6 className="text-slate-800 dark:text-white">Tunggu sampai program selesai</h6>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-center mt-4">
                                            <p className="text-slate-400 dark:text-white text-xs italic">*Human Initiative membuat pengajuan Proposal Program</p>
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
