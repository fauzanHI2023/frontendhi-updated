"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const NewsStories: React.FC = () => {
  const homePageImages = [
    "/newsstories (1).png",
    "/newsstories (2).png",
    "/newsstories (3).png",
    "/newsstories (4).png",
  ]; // Daftar gambar untuk halaman beranda

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='News & Stories'/>
    </main>
  )
}

export default NewsStories