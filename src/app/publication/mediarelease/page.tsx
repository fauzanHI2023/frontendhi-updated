"use client";

import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchMediaRelease } from "@/lib/publication/auth-media-release";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface MediaRelease {
  id: number;
  title: string;
  cover: string; // URL lengkap untuk gambar sudah disediakan oleh API
  deskripsi: string;
  link: string;
  created_at: string;
}

const MediaReleasePage = () => {
  const [mediaReleases, setMediaReleases] = useState<MediaRelease[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 9;
  const maxVisiblePages = 5;
  const { currentPage, setCurrentPage, paginate, totalPages, getVisiblePageNumbers } =
    usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getMediaReleases = async () => {
      setLoading(true);
      const data = await fetchMediaRelease();
      if (data && data.status === "200") {
        setMediaReleases(data.data);
      }
      setLoading(false);
    };
    getMediaReleases();
  }, []);

  const homePageImages = [
    "/mediarelease (1).png",
    "/mediarelease (2).png",
    "/mediarelease (3).png",
    "/mediarelease (4).png",
  ];

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(mediaReleases?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi images={homePageImages} title="Media Release" hashtag="Kolaborasi, Amanah"/>
      <section className="w-full relative flex flex-col gap-y-8 sm:px-28 px-6 sm:py-28 py-10">
        <h5 className="title-2xl-semibold-black dark:text-white">Media Release</h5>
        <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : mediaReleases && mediaReleases.length > 0 ? (
            paginate(mediaReleases).map((mediaRelease) => (
              <div
                key={mediaRelease.id}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col-reverse gap-x-3 justify-between bg-gray-50 transition duration-500 ease-in hover:bg-gray-100"
              >
                <div className="flex flex-col justify-between items-start px-6 py-4">
                  <h2 className="capitalize text-base font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">
                    {mediaRelease.title}
                  </h2>
                </div>
                <span className="w-full h-[300px] overflow-hidden relative">
                  <Image
                    src={mediaRelease.cover} // URL gambar langsung dari API
                    alt={mediaRelease.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover float-none absolute"
                  />
                </span>
              </div>
            ))
          ) : (
            <p>No media releases available.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {getVisiblePageNumbers(mediaReleases?.length || 0).map((pageNumber) => (
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
                Math.min(currentPage + 1, totalPages(mediaReleases?.length || 0))
              )
            }
            disabled={currentPage === totalPages(mediaReleases?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default MediaReleasePage;
