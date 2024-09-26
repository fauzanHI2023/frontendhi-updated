"use client";
import React, { useRef, useState, useEffect } from "react";
import { collectionPublic } from "@/data/data";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const CollectionsPublications = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  // Function to filter collection items by type
  const filterCollectionByType = (type: string) => {
    return collectionPublic.filter((item) => item.type === type);
  };

  return (
    <section className={`p-24 bg flex flex-col w-full gap-y-12`}>
      <div className="flex flex-row justify-between">
        <h5 className={`text-slate-600 dark:text-white font-bold text-2xl`}>
          View Our Collections and Publications
        </h5>
        <a
          href="#"
          className="text-sky-600 dark:text-sky-600 font-bold text-lg"
        >
          Lihat Publikasi Lainnya
        </a>
      </div>
      <div className="flex flex-row gap-x-6 w-full">
        <Tabs defaultValue="annualreport" className="w-full">
          <TabsList className="pb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="annualreport">Annual</TabsTrigger>
            <TabsTrigger value="financialreport">Financial</TabsTrigger>
            <TabsTrigger value="learningreport">Learning</TabsTrigger>
            <TabsTrigger value="manualreport">Manual</TabsTrigger>
          </TabsList>

          {/* Annual Report Tab */}
          <TabsContent
            value="annualreport"
            className="flex flex-col gap-y-8 justify-center items-start w-full"
          >
            <h5 className="title-lg-medium">Annual Report</h5>
            <div className="flex flex-row gap-x-4 w-full">
              {filterCollectionByType("annual").map((collectionItem) => (
                <div
                  key={collectionItem.name}
                  className="flex flex-col gap-y-4 w-[180px] basis-1/6  bg-slate-50 dark:bg-slate-900 justify-center items-center px-6 py-4 rounded-xl"
                >
                  <div
                    className="relative z-20 flex flex-col justify-center items-center pb-12"
                    data-aos="fade-up-left"
                    data-aos-duration="300"
                  >
                    <Image
                      height={250}
                      width={180}
                      src={collectionItem.image}
                      alt={collectionItem.name}
                      className="relative z-20 w-[120px] origin-bottom -rotate-12 left-6"
                    />
                    <div
                      className="bg-slate-100 rounded-[170px] w-[170px] h-[170px] flex absolute z-10"
                      style={{ top: "10%" }}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-y-4 w-[180px]"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <h4 className="text-slate-700 font-semibold text-lg">
                      {collectionItem.name}
                    </h4>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col justify-end items-start">
                        <h5 className="text-slate-600 text-base font-base">
                          {collectionItem.deskripsi}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="all"
            className="flex flex-col gap-y-8 justify-center items-start w-full"
          >
            <h5 className="title-lg-medium">Semua Report</h5>
            <div className="flex flex-row gap-x-4 w-full">
              <Swiper
                slidesPerView={6}
                spaceBetween={20}
                autoplay={{
                  delay: 4500,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
              >
              {collectionPublic.map((collectionItem) => (
                <SwiperSlide
                  key={collectionItem.name}
                  className="flex flex-col gap-y-4 bg-slate-50 dark:bg-slate-900 justify-center items-center px-6 py-4 rounded-xl"
                >
                  <div
                    className="relative z-20 flex flex-col justify-center items-center pb-12"
                    data-aos="fade-up-left"
                    data-aos-duration="300"
                  >
                    <Image
                      height={250}
                      width={180}
                      src={collectionItem.image}
                      alt={collectionItem.name}
                      className="relative z-20 w-[120px] origin-bottom -rotate-12 left-6"
                    />
                    <div
                      className="bg-slate-100 rounded-[170px] w-[170px] h-[170px] flex absolute z-10"
                      style={{ top: "10%" }}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-y-4 w-[180px]"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <h4 className="text-slate-700 font-semibold text-lg">
                      {collectionItem.name}
                    </h4>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col justify-end items-start">
                        <h5 className="text-slate-600 text-base font-base">
                          {collectionItem.deskripsi}
                        </h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
          </TabsContent>

          {/* Financial Report Tab */}
          <TabsContent
            value="financialreport"
            className="flex flex-col gap-y-8 justify-center items-start w-full"
          >
            <h5 className="title-lg-medium">Financial Report</h5>
            <div className="flex flex-row gap-x-4 w-full">
              {filterCollectionByType("financial").map((collectionItem) => (
                <div
                  key={collectionItem.name}
                  className="flex flex-col gap-y-4 w-[180px] basis-1/6  bg-slate-50 dark:bg-slate-900 justify-center items-center px-6 py-4 rounded-xl"
                >
                  <div
                    className="relative z-20 flex flex-col justify-center items-center pb-12"
                    data-aos="fade-up-left"
                    data-aos-duration="300"
                  >
                    <Image
                      height={250}
                      width={180}
                      src={collectionItem.image}
                      alt={collectionItem.name}
                      className="relative z-20 w-[120px] origin-bottom -rotate-12 left-6"
                    />
                    <div
                      className="bg-slate-100 rounded-[170px] w-[170px] h-[170px] flex absolute z-10"
                      style={{ top: "10%" }}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-y-4 w-[180px]"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <h4 className="text-slate-700 font-semibold text-lg">
                      {collectionItem.name}
                    </h4>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col justify-end items-start">
                        <h5 className="text-slate-600 text-base font-base">
                          {collectionItem.deskripsi}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Learning Report Tab */}
          <TabsContent
            value="learningreport"
            className="flex flex-col gap-y-8 justify-center items-start w-full"
          >
            <h5 className="title-lg-medium">Learning</h5>
            <div className="flex flex-row gap-x-4 w-full">
              {filterCollectionByType("learning").map((collectionItem) => (
                <div
                  key={collectionItem.name}
                  className="flex flex-col gap-y-4 w-[180px] basis-1/6  bg-slate-50 dark:bg-slate-900 justify-center items-center px-6 py-4 rounded-xl"
                >
                  <div
                    className="relative z-20 flex flex-col justify-center items-center pb-12"
                    data-aos="fade-up-left"
                    data-aos-duration="300"
                  >
                    <Image
                      height={250}
                      width={180}
                      src={collectionItem.image}
                      alt={collectionItem.name}
                      className="relative z-20 w-[120px] origin-bottom -rotate-12 left-6"
                    />
                    <div
                      className="bg-slate-100 rounded-[170px] w-[170px] h-[170px] flex absolute z-10"
                      style={{ top: "10%" }}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-y-4 w-[180px]"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <h4 className="text-slate-700 font-semibold text-lg">
                      {collectionItem.name}
                    </h4>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col justify-end items-start">
                        <h5 className="text-slate-600 text-base font-base">
                          {collectionItem.deskripsi}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Manual Report Tab */}
          <TabsContent
            value="manualreport"
            className="flex flex-col gap-y-8 justify-center items-start w-full"
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <h5 className="title-lg-medium">Manual Book</h5>
            <div className="flex flex-row gap-x-4 w-full">
              {filterCollectionByType("manual").map((collectionItem) => (
                <div
                  key={collectionItem.name}
                  className="flex flex-col gap-y-4 w-[180px] basis-1/6 bg-slate-50 dark:bg-slate-900 justify-center items-center px-6 py-4 rounded-xl"
                >
                  <div
                    className="relative z-20 flex flex-col justify-center items-center pb-12"
                    data-aos="fade-up-left"
                    data-aos-duration="300"
                  >
                    <Image
                      height={250}
                      width={180}
                      src={collectionItem.image}
                      alt={collectionItem.name}
                      className="relative z-20 w-[120px] origin-bottom -rotate-12 left-6"
                    />
                    <div
                      className="bg-slate-100 rounded-[170px] w-[170px] h-[170px] flex absolute z-10"
                      style={{ top: "10%" }}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-y-4 w-[180px]"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <h4 className="text-slate-700 font-semibold text-lg">
                      {collectionItem.name}
                    </h4>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col justify-end items-start">
                        <h5 className="text-slate-600 text-base font-base">
                          {collectionItem.deskripsi}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CollectionsPublications;
