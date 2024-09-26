"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const Library = () => {
  const homePageImages = [
    "/library (1).png",
    "/library (2).png",
    "/library (3).png",
    "/library (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Library'/>
    </main>
  )
}

export default Library