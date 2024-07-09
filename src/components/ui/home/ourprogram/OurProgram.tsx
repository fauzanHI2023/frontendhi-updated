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
          Welcome to <span className="text-blue-500">Human Initiative</span> Platform to help everyone
        </h5>
        <p className={` font-base text-normal sm:w-1/2 w-full pr-6`} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1000"
        >
          human initiative is a non profit organization thats  works to improve the live of underprivileged children toughout the world. we provide children, disaster, empowerment and infrastructure 
        </p>
      </div>
      <div
        className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}
      >
        {programCard.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl sm:pb-0 pb-6`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <div className={`p-4 rounded-xl`}>
            <div className={`pb-4`}><span className={`text-4xl text-blue-500`}>{program.icon}</span></div>
            <h3 className={`sm:text-xl text-lg font-semibold sm:pb-6 pb-3`}>{program.label}</h3>
            <p className={``}>{program.text}</p>
            <Link href={program.url} className={`inline-block bg-transparent text-2xl p-1`}>
              <HiArrowUpRight/>
            </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProgram;
