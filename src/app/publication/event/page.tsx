"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const Event = () => {
  const homePageImages = [
    "/event (1).png",
    "/event (2).png",
    "/event (3).png",
    "/event (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Event'/>
    </main>
  )
}

export default Event