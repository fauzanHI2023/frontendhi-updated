"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchPublicReports } from "@/lib/publication/auth-public-report";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import { ArrowDownToLine } from "lucide-react";
import PdfViewer from "@/components/pdf/PdfViewer";
import AOS from "aos";
import "aos/dist/aos.css";

interface PublicReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  type_report: string;
  coverUrl?: string;
  linkUrl?: string;
}

const PublicReport = () => {
  const [publicReports, setPublicReports] = useState<PublicReport[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const itemsPerPage = 10; // Number of items per page
  const { currentPage, setCurrentPage, paginate, totalPages } =
    usePagination(itemsPerPage);

  useEffect(() => {
    const getPublicReports = async () => {
      setLoading(true);
      const data = await fetchPublicReports();
      if (data && data.status === "200") {
        const updatedReports = await Promise.all(
          data.data.map(async (report: PublicReport) => {
            try {
              const coverResponse = await axios.get(
                `/api/getImage?key=${report.cover}`
              );
              const linkResponse = await axios.get(
                `/api/getFile?key=${report.link}`
              );

              return {
                ...report,
                coverUrl: coverResponse.data.url,
                linkUrl: linkResponse.data.url,
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for report ${report.id}:`,
                error
              );
              return report;
            }
          })
        );
        setPublicReports(updatedReports);
      }
      setLoading(false);
    };
    getPublicReports();
    AOS.init();
  }, []);

  const homePageImages = [
    "/publicreport (1).png",
    "/publicreport (2).png",
    "/publicreport (3).png",
    "/publicreport (4).png",
  ];

  const filterReports = (type: string) => {
    if (!publicReports) return [];
    if (type === "all") return publicReports;
    return publicReports.filter((report) => report.type_report === type);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (
      let i = 1;
      i <= totalPages(filterReports(selectedTab)?.length || 0);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="Public Report of Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="relative w-full flex flex-col gap-y-8 sm:px- px-6 sm:py-12 py-10">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => {
            setSelectedTab(value);
            setCurrentPage(1); // Reset pagination when changing tabs
          }}
        >
          <TabsList className="pb-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="annual">Annual Report</TabsTrigger>
            <TabsTrigger value="financial">Financial Report</TabsTrigger>
            <TabsTrigger value="factsheet">Fact Sheet</TabsTrigger>
          </TabsList>

          <TabsContent
            value={selectedTab}
            className="flex flex-col gap-y-8 justify-center items-center w-full"
          >
            <div className="sm:grid sm:grid-cols-2 sm:gap-10 w-full flex flex-col gap-y-6">
              {loading ? (
                <p>Loading...</p>
              ) : filterReports(selectedTab).length > 0 ? (
                paginate(filterReports(selectedTab)).map((report) => (
                  <div
                    key={report.id}
                    className="publikasi-card mb-4 border-b pb-4 w-full flex flex-row gap-x-3 justify-between bg-gray-50 transition duration-500 ease-in hover:bg-gray-100"
                  >
                    <div className="flex flex-col justify-between items-start w-3/5 px-6 py-4">
                      <h2 className="text-sky-500 text-xl font-normal">
                        PDF File
                      </h2>
                      <h2 className="capitalize text-lg leading-6 font-medium text-slate-950 dark:text-white leading-6 h-1/6 overflow-hidden">
                        {report.title}
                      </h2>
                      <div className="flex sm:flex-row flex-col gap-x-4">
                        {report.linkUrl ? (
                          <a
                            href={report.linkUrl}
                            target="_blank"
                            className="text-sky-500 hover:underline mt-2 flex flex-row justify-center items-center"
                          >
                            Download Report
                            <ArrowDownToLine className="text-sky-600 hover:animate-shake" />
                          </a>
                        ) : (
                          <p>No report file available.</p>
                        )}
                        {report.linkUrl ? (
                          <PdfViewer fileUrl={report.linkUrl} />
                        ) : (
                          <p>No report file available.</p>
                        )}
                      </div>
                    </div>
                    {report.coverUrl ? (
                      <span className="w-[230px] h-[300px] overflow-hidden relative">
                        <Image
                          src={report.coverUrl}
                          alt={report.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover float-none absolute"
                        />
                      </span>
                    ) : (
                      <p>No img image available.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No reports available.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300"
              >
                <FaArrowLeft />
              </button>

              <div className="page-numbers flex gap-2">
                {generatePageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === pageNumber
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      totalPages(filterReports(selectedTab)?.length || 0)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages(filterReports(selectedTab)?.length || 0)
                }
                className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300"
              >
                <FaArrowRight />
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default PublicReport;
