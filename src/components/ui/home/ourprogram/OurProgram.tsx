"use client"
import React, { useEffect } from "react";
import { programCard } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import AOS from "aos";
import 'aos/dist/aos.css';

const OurProgram = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6`}
    >
      <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
        <h5
          className={` font-bold sm:text-3xl text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4`} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700"
        >
          Welcome to <span className="text-sky-500">Human Initiative</span> Together We Create Real Change for Humanity
        </h5>
        <p className={` font-base text-normal sm:w-1/2 w-full pr-6`} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1000"
        >
          Human Initiative is here to provide sustainable solutions for the humanitarian movement, creating real change that restores hope, empowers communities, and builds a better future for all.
        </p>
      </div>
      <div
        className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}
      >
        {programCard.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl bg-slate-200 dark:bg-slate-900 sm:pb-0 pb-6`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <div className={`flex flex-col gap-y-4 py-4 px-6 rounded-xl`}>
              <div className={`pb-4`}><span className={`text-4xl text-sky-500`}>{program.icon}</span></div>
              <h3 className={`sm:text-xl text-lg font-semibold sm:pb-6 pb-3`}>{program.label}</h3>
              <p className={`text-sm`}>{program.text}</p>
              <Link href={program.url} className={`flex w-[40px] bg-slate-100 dark:bg-slate-800 rounded-lg p-2 inline-block bg-transparent text-2xl p-1 hover:transition hover:rotate-[45deg] hover:ease-in-out dark:hover:bg-slate-700 hover:bg-sky-500 hover:text-white`}>
                <HiArrowUpRight className="hover:transition hover:ease-in-out hover:duration-300"/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProgram;
