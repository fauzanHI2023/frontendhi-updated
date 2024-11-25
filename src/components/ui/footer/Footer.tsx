"use client";
import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isPageLogin = pathname === "/login";

  const isPageRegister = pathname === "/register";
  return (
    <footer
      className={`flex flex-col gap-y-16 mx-auto w-full max-w-8xl px-6 py-12 xs:px-8 sm:px-24 sm:py-24 sm:pb-16 bg-gradient-to-r from-sky-500 to-blue-950 dark:bg-slate-800 ${
        isPageLogin ? "hidden" : "flex"
      } ${isPageRegister ? "hidden" : "flex"}`}
      style={{boxShadow: '0px 0px 3px 0px rgba(148,148,148,1)'}}
    >
      <div className="flex flex-row justify-between items-start w-full">
        <div className="w-1/3 ">
          <Image
            src="/logo-footer-white.png"
            alt="Human Initiative"
            width={167}
            height={60}
            className="w-[166px] h-[60px]"
          />
        </div>
        <div className="flex flex-col gap-y-8 w-3/5">
          <ul className="flex flex-row gap-x-4">
            <li className="text-white text-base font-normal">
              <Link href="/termandconditions">Term and Conditions</Link>
            </li>
            <li className="text-white text-base font-normal">|</li>
            <li className="text-white text-base font-normal">
              <Link href="/privacypolicy">Privacy Policy</Link>
            </li>
            <li className="text-white text-base font-normal">|</li>
            <li className="text-white text-base font-normal">
              <Link href="/faq">FAQ</Link>
            </li>
            <li className="text-white text-base font-normal">|</li>
            <li className="text-white text-base font-normal">
              <Link href="/whistleblowing">Whistleblowing HI</Link>
            </li>
          </ul>
          <ul className="flex flex-row gap-x-4">
            <li className="text-white text-base font-normal">
              <Link href="/termandconditions">Contact</Link>
            </li>
            <li className="text-white text-base font-normal">|</li>
            <li className="text-white text-base font-normal">
              <Link href="/privacypolicy">Locations</Link>
            </li>
          </ul>
          <ul className="flex flex-row gap-x-4">
            <li className="text-white text-base font-normal">
              NPWP : 01.945.505.4-005.000
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <p className="text-white dark:text-white text-sm font-normal italic">
            &quot;Human Initiative berkomitmen menerapkan Sistem Manajemen Anti
            Penyuapan sehingga tidak membolehkan segala bentuk penyuapan dan
            gratifikasi, serta tidak akan mendukung atau menyediakan
            dana/material untuk individu maupun organisasi yang dikenal
            menganjurkan, mendukung, atau terlibat dalam aktivitas melanggar
            hukum, kekerasan, pencucian uang ataupun terorisme.&quot;
          </p>
        </div>
        <div className="flex flex-row justify-between border-t border-slate-400 dark:border-white pt-4">
          <h6 className={`text-white dark:text-white text-xs`}>
            <span>&#64;</span> 2024 Human Initiative. All rights reserved
          </h6>
          <div className="flex flex-row">
            <span className={`px-1`}>
              <FaWhatsapp className="text-white"/>
            </span>
            <span className={`px-1`}>
              <FaInstagram className="text-white"/>
            </span>
            <span className={`px-1`}>
              <AiOutlineYoutube className="text-white"/>
            </span>
            <span className={`px-1`}>
              <FaTiktok className="text-white"/>
            </span>
            <span className={`px-1`}>
              <FaLinkedinIn className="text-white"/>
            </span>
            <span className={`px-1`}>
              <FaXTwitter className="text-white"/>
            </span>
            <span className={`px-1`}>
              <FaFacebookF className="text-white"/>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
