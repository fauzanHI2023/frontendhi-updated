"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const mediarelease = () => {
  const homePageImages = [
    "/mediarelease (1).png",
    "/mediarelease (2).png",
    "/mediarelease (3).png",
    "/mediarelease (4).png",
  ]; // Daftar gambar untuk halaman beranda

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Media Release'/>
    </main>
  )
}

export default mediarelease