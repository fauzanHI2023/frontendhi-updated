"use client"
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { FaWhatsapp, FaInstagram, FaTiktok, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
    const { theme } = useTheme();
  return (
    <footer className={`flex flex-col bg-${theme}-hi mx-auto w-full max-w-8xl px-6 py-12 xs:px-8 sm:px-16`}>
        <div className="flex flex-row">
            <div></div>
            <div></div>
        </div>
        <div className="flex flex-col">
            <div>
                <p></p>
            </div>
            <div className="flex flex-row justify-between">
                <h6 className={`text-${theme}-hi`}><span>&#64;</span> 2024 Human Initiative. All rights reserved</h6>
                <div className="flex flex-row">
                    <span className={`px-1 text-${theme}-hi`}><FaWhatsapp/></span>
                    <span className={`px-1 text-${theme}-hi`}><FaInstagram/></span>
                    <span className={`px-1 text-${theme}-hi`}><AiOutlineYoutube/></span>
                    <span className={`px-1 text-${theme}-hi`}><FaTiktok/></span>
                    <span className={`px-1 text-${theme}-hi`}><FaLinkedinIn/></span>
                    <span className={`px-1 text-${theme}-hi`}><FaXTwitter/></span>
                    <span className={`px-1 text-${theme}-hi`}><FaFacebookF/></span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer