"use client";
import React, { useRef, useState, useEffect } from "react";
import { collectionPublic } from "@/data/data";
import { fetchPublicReports } from "@/lib/publication/auth-public-report";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import PdfViewervb from "@/components/pdf/pdfViewervb";
import { ArrowDownToLine, SlidersHorizontal } from "lucide-react";

interface PublicReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  type_report: string;
  year_publicreport: string;
  coverUrl?: string;
  linkUrl?: string;
}

const CollectionsPublications = () => {
  const [publicReports, setPublicReports] = useState<PublicReport[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  useEffect(() => {
    AOS.init();
  }, []);

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
  }, []);

  const filterReports = () => {
    if (!publicReports) return [];
    const sortedNews = [...publicReports].sort((a, b) => b.id - a.id);
    let filtered = sortedNews.slice(0, 5);
    if (selectedTab !== "all") {
      filtered = filtered.filter(
        (report) => report.type_report === selectedTab
      );
    }
    return filtered;
  };

  // Function to filter collection items by type
  const filterCollectionByType = (type: string) => {
    return collectionPublic.filter((item) => item.type === type);
  };

  return (
    <section className={`p-24 bg flex flex-col w-full gap-y-12`}>
      <div className="flex flex-row justify-between">
        <h5
          className={`text-slate-600 dark:text-slate-400 dark:text-white font-bold text-2xl`}
        >
          Explore Knowledge and Inspiration: Discover Our Publications and
          Collections!
        </h5>
        <Link
          href="#"
          className="text-sky-600 dark:text-sky-600 font-bold text-lg"
        >
          See More
        </Link>
      </div>
      <div className="flex flex-row gap-x-6 w-full">
        <Tabs defaultValue="all" className="w-full">
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
            <div className="sm:grid sm:grid-cols-5 sm:gap-10 w-full flex flex-col gap-y-6">
              {loading ? (
                <p>Loading...</p>
              ) : filterReports().length > 0 ? (
                filterReports().map((report) => (
                  <div
                    key={report.id}
                    className="publikasi-card mb-4 border-b w-full flex flex-col gap-x-3 justify-between bg-gray-50 transition duration-500 ease-in hover:bg-gray-100"
                  >
                    {report.coverUrl ? (
                      <span className="w-[230px] h-[300px] overflow-hidden relative">
                        <Image
                          src={report.coverUrl}
                          alt={report.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover float-none absolute origin-bottom -rotate-12 left-6"
                        />
                      </span>
                    ) : (
                      <p>No img image available.</p>
                    )}
                    <div className="flex flex-col justify-between items-start w-full px-6 py-2">
                      <h2 className="capitalize text-base leading-6 font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">
                        {report.title}
                      </h2>
                      <div className="flex sm:flex-row flex-col gap-x-4">
                        {report.linkUrl ? (
                          <a
                            href={report.linkUrl}
                            target="_blank"
                            className="hidden text-sky-500 hover:underline mt-2 flex flex-row justify-center items-center"
                          >
                            Download Report
                            <ArrowDownToLine className="text-sky-600 hover:animate-shake" />
                          </a>
                        ) : (
                          <p>No report file available.</p>
                        )}
                        {report.linkUrl ? (
                          <PdfViewervb fileUrl={report.linkUrl} />
                        ) : (
                          <p>No report file available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reports available.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CollectionsPublications;
