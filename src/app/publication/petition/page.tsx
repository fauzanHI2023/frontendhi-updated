"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const Petition = () => {
  const homePageImages = [
    "/petition (1).png",
    "/petition (2).png",
    "/petition (3).png",
    "/petition (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Petition'/>
    </main>
  )
}

export default Petition