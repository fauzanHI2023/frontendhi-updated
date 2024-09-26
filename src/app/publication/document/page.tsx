"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const Document = () => {
  const homePageImages = [
    "/document (1).png",
    "/document (2).png",
    "/document (3).png",
    "/document (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Document'/>
    </main>
  )
}

export default Document