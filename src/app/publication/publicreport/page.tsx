"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchPublicReports } from "@/lib/publication/auth-public-report";
import axios from "axios";

interface PublicReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  type_report: string;
  created_at: string;
  coverUrl?: string; // Properti opsional untuk URL cover dari S3
  linkUrl?: string; // Properti opsional untuk URL file dari S3
}

const PublicReport = () => {
  const [publicReports, setPublicReports] = useState<PublicReport[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPublicReports = async () => {
      const data = await fetchPublicReports();
      if (data && data.status === "200") {
        // Map data public reports dan fetch URL cover dan link dari S3
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
        setPublicReports(updatedReports);
      }
      setLoading(false);
    };
    getPublicReports();
  }, []);

  const homePageImages = [
    "/publicreport (1).png",
    "/publicreport (2).png",
    "/publicreport (3).png",
    "/publicreport (4).png",
  ]; // Daftar gambar untuk halaman beranda

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi images={homePageImages} title="Public Report" />
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
        <h5 className="title-2xl-semibold-black dark:text-white">Public Report</h5>
        <div className="sm:grid sm:grid-cols-5 sm:gap-8 flex flex-col gap-y-6">
          {publicReports && publicReports.length > 0 ? (
            publicReports.map((report) => (
              <div
                key={report.id}
                className="mb-4 border-b pb-4 w-full flex flex-col gap-y-3"
              >
                {report.coverUrl ? (
                  <img
                    src={report.coverUrl}
                    alt={report.title}
                    className="w-48 mt-2"
                  />
                ) : (
                  <p>No cover image available.</p>
                )}
                <h2 className="text-base font-semibold text-slate-600 dark:text-white">
                  {report.title}
                </h2>
                {report.linkUrl ? (
                  <a
                    href={report.linkUrl}
                    target="_blank"
                    className="text-blue-500 hover:underline mt-2 block"
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

export default PublicReport;
