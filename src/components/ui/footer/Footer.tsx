"use client"
import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaTiktok, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isPageLogin = pathname === "/login";

    const isPageRegister = pathname === "/register";
  return (
    <footer className={`flex flex-col mx-auto w-full max-w-8xl px-6 py-12 xs:px-8 sm:px-16 bg-background ${
          isPageLogin ? "hidden" : "flex"
        } ${
          isPageRegister ? "hidden" : "flex"
        }`}>
        <div className="flex flex-row">
            <div></div>
            <div></div>
        </div>
        <div className="flex flex-col">
            <div>
                <p></p>
            </div>
            <div className="flex flex-row justify-between">
                <h6 className={``}><span>&#64;</span> 2024 Human Initiative. All rights reserved</h6>
                <div className="flex flex-row">
                    <span className={`px-1`}><FaWhatsapp/></span>
                    <span className={`px-1`}><FaInstagram/></span>
                    <span className={`px-1`}><AiOutlineYoutube/></span>
                    <span className={`px-1`}><FaTiktok/></span>
                    <span className={`px-1`}><FaLinkedinIn/></span>
                    <span className={`px-1`}><FaXTwitter/></span>
                    <span className={`px-1`}><FaFacebookF/></span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer