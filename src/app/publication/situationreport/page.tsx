"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchSituationReports } from "@/lib/publication/auth-situation-report";
import axios from "axios";
import Image from "next/image";

interface SituationReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  coverUrl?: string; // Properti opsional untuk URL cover dari S3
  linkUrl?: string; // Properti opsional untuk URL file dari S3
}

const SituationReport = () => {
  const [situationReports, setSituationReports] = useState<
    SituationReport[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSituationReports = async () => {
      const data = await fetchSituationReports();
      if (data && data.status === "200") {
        // Map data public reports dan fetch URL cover dan link dari S3
        const updatedReports = await Promise.all(
          data.data.map(async (report: SituationReport) => {
            try {
              const coverResponse = await axios.get(
                `/api/getImage?key=${report.cover}`
              );
              const linkResponse = await axios.get(
                `/api/getFile?key=${report.link}`
              );

              return {
                ...report,
                coverUrl: coverResponse.data.url, // URL dari S3 untuk cover
                linkUrl: linkResponse.data.url, // URL dari S3 untuk link
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for report ${report.id}:`,
                error
              );
              return report; // Kembalikan data report tanpa URL jika terjadi error
            }
          })
        );
        setSituationReports(updatedReports);
      }
      setLoading(false);
    };
    getSituationReports();
  }, []);

  const homePageImages = [
    "/situation (1).png",
    "/situation (2).png",
    "/situation (3).png",
    "/situation (4).png",
  ]; // Daftar gambar untuk halaman beranda

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi images={homePageImages} title="Situation Report" />
      <section className="relative flex flex-col gap-y-8 sm:px-28 px-6 sm:py-28 py-10">
        <div className="blur-sm">
          <div
            style={{
              position: "absolute",
              left: "-160px",
              width: "510px",
              height: "233px",
              bottom: "-60px",
              maskImage: `url('/publikasi.svg')`,
              maskSize: "contain",
              maskPosition: "center",
              maskRepeat: "no-repeat",
              transform: "translateX(-100px)",
              overflow: "hidden",
            }}
          >
            <div
              className="animate-infinite-blue-slice"
              style={{ height: "500px" }}
            >
              <div
                style={{
                  background: `linear-gradient(180deg, rgba(111, 246, 222, 0) 6.58%, rgb(45 189 235 / 94%) 44.88%, rgb(28 186 249 / 78%) 68.24%, rgba(60, 177, 109, 0) 100%)`,
                  height: "500px",
                  width: "400px",
                  position: "absolute",
                  top: "-250px",
                  zIndex: "2",
                }}
              ></div>
              <div
                style={{
                  background: `linear-gradient(180deg, rgba(111, 246, 222, 0) 6.58%, rgb(45 189 235 / 94%) 44.88%, rgb(28 186 249 / 78%) 68.24%, rgba(60, 177, 109, 0) 100%)`,
                  height: "500px",
                  width: "400px",
                  position: "absolute",
                  zIndex: "2",
                  bottom: "-100px",
                }}
              ></div>
            </div>
          </div>
        </div>
        <h5 className="title-2xl-semibold-black dark:text-white">
           Report
        </h5>
        <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
          {situationReports && situationReports.length > 0 ? (
            situationReports.map((report) => (
              <div
                key={report.id}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col gap-y-3 bg-gray-50 transition duration-500 ease-in hover:bg-gray-100"
              >
                {report.coverUrl ? (
                  <span className="h-[240px] overflow-hidden relative">
                    <Image
                      src={report.coverUrl}
                      alt={report.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover float-none absolute"
                    />
                  </span>
                ) : (
                  <p>No cover image available.</p>
                )}
                <h2 className="px-6 py-4 capitalize text-base font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">
                  {report.title}
                </h2>
                {report.linkUrl ? (
                  <a
                    href={report.linkUrl}
                    target="_blank"
                    className="download-situation text-blue-500 hover:underline mt-2 block"
                  >
                    Download Report
                  </a>
                ) : (
                  <p>No report file available.</p>
                )}
              </div>
            ))
          ) : (
            <li>No reports available.</li>
          )}
        </div>
      </section>
    </main>
  );
};

export default SituationReport;
