"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import MapsAbout from "@/components/ui/utility/MapsAbout";
import {
  Building,
  AlignVerticalDistributeCenter,
  Slack,
  Award,
  Phone,
  Mail,
  Instagram,
  DatabaseZap,
  HeartHandshake,
  SunSnow,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-wrap-new";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Team {
  image: string;
  nama: string;
  jabatan: string;
}

const teams: Team[] = [
  {
    image: "/Pak-Tomy (3).jpeg",
    nama: "Tomy Hendrajati",
    jabatan: "President of Human Initiative",
  },
  {
    image: "/Pak-Romi.jpeg",
    nama: "Romi Ardiansyah",
    jabatan: "Vice President of Operation",
  },
  {
    image: "/Pak-Rully.jpeg",
    nama: "Rully Barlian Thamrin",
    jabatan: "Vice President of Resources",
  },
  {
    image: "/Pak-Andjar.jpeg",
    nama: "Tomy Hendrajati",
    jabatan: "Vice President of Communication, Network and Development",
  },
];

interface Award {
  tahun: string;
  judul: string;
  keterangan: string;
}

const awards: Award[] = [
  {
    tahun: "2006",
    judul: "Program Rebuilding Fund",
    keterangan:
      "Mendapatkan penghargaan dari Numico Group, Netherland dalam program “Rebuilding Fund” pembangunan 500 perumahan dan sekolah, bagi korban gempa Yogyakarta 2006.",
  },
  {
    tahun: "2010",
    judul: "Pahlawan dari Tanah Bencana",
    keterangan:
      "Suharjoni, Disaster Risk Management Human Initiative, terpilih sebagai satu dari sembilan orang “Pahlawan dari tanah bencana” versi majalah Tempo edisi khusus Tokoh Pilihan yang terbit Desember 2010.",
  },
  {
    tahun: "2011",
    judul: "The Best Humanitarian NGO",
    keterangan:
      "Meraih (The Best Humanitarian NGO) pada acaraThe International Conference on Family of The Islamic World yang diselenggarakan The Union NGOs of The Islamic World (UNIW) tanggal 7-8 Mei 2011.",
  },
  {
    tahun: "2011",
    judul: "Platinum bidang Konsumen",
    keterangan:
      "Pada 15 Desember 2011, Human Initiative mendukung Program Gizi Kita dan Program Ayo Melek Gizi yang mendorong PT. Sarihusada Generasi Mahardhika meraih Penghargaan Platinum bidang Konsumen Indonesian CSR Awards 2011 untuk sektor industri dan manufaktur.",
  },
  {
    tahun: "2012",
    judul: "Penghargaan dari BNPB",
    keterangan:
      "Eko Sulistio, Disaster Risk Management Human Initiative mendapatkan penghargaan dari BADAN SAR NASIONAL atas partisipasinya dalam penanganan korban kecelakaan Pesawat Sukhoi SJ100 di kawasan Gunung Salak Bogor, Jawa Barat Mei 2012.",
  },
  {
    tahun: "2012",
    judul: "Finalis Program MDG's Award",
    keterangan:
      "Finalis Program MDG's Award Tahun 2012 dalam Program Pondok Sagita (Sadar Gizi Ibu dan Balita).",
  },
  {
    tahun: "2013",
    judul: "Sincerest Appreciation",
    keterangan:
      "Sincerest Appreciation to Human Initiative in the commemoration of World Humanitarian Day 2013 in Indonesia from UN OCHA (UN Office for The Coordination Humanitarian Affairs) Indonesia.",
  },
  {
    tahun: "2018",
    judul: "Penghargaan dari BNPB",
    keterangan:
      "Penghargaan dari BNPB karena dinilai telah berjasa mendukung Pemerintah dalam penanggulangan bencana, 2018.",
  },
  {
    tahun: "2006-2018",
    judul: "Program Ekspedisi Nusantara",
    keterangan:
      "Terbit Undang - Undang tentang Pengelolaan Zakat yang mengubah tata kelola organisasi secara internal.",
  },
];

interface Story {
  year: string;
  description: string;
}

const stories: Story[] = [
  {
    year: "1999",
    description:
      "Human Initiative lahir dan mengelola bantuan kemanusiaan untuk berbagai krisis yang terjadi di tanah air.",
  },
  {
    year: "2001",
    description: "Human Initiative ditetapkan sebagai Amil Zakat Nasional.",
  },
  {
    year: "2005",
    description:
      "Mengelola bantuan kemanusiaan dan program untuk korban Tsunami Aceh yang volumenya 5x lipat dari sebelumnya.",
  },
  {
    year: "2008",
    description:
      "Terdaftar di Perserikatan Bangsa-Bangsa sebagai NGO dengan Special Consulative Status with the Economic Social Council.",
  },
  {
    year: "2010",
    description:
      "Ditetapkan sebagai Organisasi Sosial Nasional dan terdaftar sebagai partner lembaga di Uni Eropa untuk program sosial.",
  },
  {
    year: "2012",
    description:
      "Terbit Undang - Undang tentang Pengelolaan Zakat yang mengubah tata kelola organisasi secara internal.",
  },
  {
    year: "2016",
    description:
      "Spin-off dan mengubah nama menjadi Human Initiative yang berfokus pada program kemanusiaan, tidak lagi mengelola zakat, infak, dan sadaqah.",
  },
];

interface Branch {
  negara: string;
  namacabang: string;
  alamat: string;
}

const branch: Branch[] = [
  {
    negara: "Indonesia",
    namacabang: "Kantor Pusat",
    alamat: "Jl. Anggrek, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16453",
  },
  {
    negara: "Indonesia ",
    namacabang: "KCP Bontang",
    alamat:
      "Jln HM Ardhan RT 25 Pisangan Kelurahan Satimpo – Bontang Selatan Kota Bontang Kalimantan Timur",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Bengkulu",
    alamat:
      "Jl Merapi Raya No. 64 Kel panorama Kec. Singaran Pati Kota Bengkulu 38226",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Sulawesi Selatan",
    alamat:
      "Jl. Puri Tata Indah No.36 Palace, Blok A, Parang Tambung, Kec. Tamalate, Kota Makassar, Sulawesi Selatan 90224",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Riau",
    alamat:
      "Jalan Paus Ujung No. 1B, Simpang Arifin Ahmad Tangkerang Barat, Kec. Marpoyan Damai Pekanbaru 28125",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Kalimantan Timur",
    alamat:
      "Balikpapan Baru Cluster Toronto Blok JA6, Damai, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur 76114",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Bukittinggi",
    alamat: "Jalan Hafid Jalil, RT 03/RW 01 Birugo Bukittinggi 26181",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Jawa Timur",
    alamat:
      "Jalan Ngagel Madya VIII no. 32, Baratajaya, Gubeng, Surabaya, Jawa Timur, 60284",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Sumatera Barat",
    alamat:
      "alan By Pass, Kayu Gadang RT/RW 04/06 (Belakang Masjid Taufiq), Kel. Pasar Ambacang, Kec. Kuranji, Padang 25152",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Daerah Istimewa Yogyakarta",
    alamat:
      "Jl. Bangirejo Taman No.9, Karangwaru, Kec. Tegalrejo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55241",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Sumatera Utara",
    alamat:
      "Jalan Kenanga Raya No. 22, Kel. Tanjung Sari Kec. Medan Selayang, 20132",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Jawa Tengah",
    alamat: "Jalan Setiabudi No. 70, Semarang 50269",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Aceh",
    alamat: "Jalan Reformasi, Desa Santan, Kec. Ingin Jaya, Aceh Besar 23371",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Maluku",
    alamat:
      "Jalan Kebun Cengkeh Komp. BTN Manusela Blok B/5-6, Lt. 2, Desa Batu Merah Kec, Sirimau, Ambon 97128",
  },
  {
    negara: "Indonesia",
    namacabang: "Human Initiative Jawa Barat",
    alamat: "Jalan Cikutra No.138, Bandung 40124",
  },
  {
    negara: "Australia",
    namacabang: "Human Initiative Australia",
    alamat: "30 Australis Dr, Ropes Crossing NSW 2760, Australia",
  },
  {
    negara: "Inggris",
    namacabang: "Human Initiative United Kingdom",
    alamat: "112 Waverley Rd, Harrow HA2 9RE, UK",
  },
  {
    negara: "Korea Selatan",
    namacabang: "Human Initiative Korea Selatan",
    alamat: "Busan Indonesia Center 3rd Floor 1900 Geumgok-dong Buk-gu, Busan",
  },
  {
    negara: "Representatif",
    namacabang: "REPRESENTATIF",
    alamat:
      "Amerika, Arab Saudi, Belanda, Denmark, Jerman, Jepang, Kuwait, Malaysia, Maroko, Singapura, Qatar, Taiwan, Turki dan Uni Emirat Arab.",
  },
];

const slideStories = {
  className: "center",
  focusOnSelect: true,
  centerMode: true,
  infinite: false,
  variableWidth: true,
  adaptiveHeight: true,
  centerPadding: "60px",
  slidesToShow: 1,
  speed: 500,
};


const WhoWeAre = () => {
  const wordFlips = ["build", "evolve"];
  const [selectedBranchType, setSelectedBranchType] = useState<string>("Pusat");

  const filteredBranches = branch.filter((b) => {
    if (selectedBranchType === "Pusat") return b.namacabang === "Kantor Pusat";
    if (selectedBranchType === "Cabang Indonesia")
      return b.negara === "Indonesia" && b.namacabang !== "Kantor Pusat";
    if (selectedBranchType === "Cabang Luar Indonesia")
      return b.negara !== "Indonesia";
    return false;
  });
  return (
    <main className="flex flex-col sm:py-24 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <section className="flex flex-col sm:pt-16 pt-0 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row gap-x-16 justify-center items-end pb-20">
          <h5 className="text-slate-800 text-6xl font-semibold sm:w-1/2 w-full leading-tight">
            We <FlipWords words={wordFlips} className="text-sky-500" />
            humanity between
            <span className="text-slate-500 pl-3">
              organizations and everyone
            </span>
          </h5>
          <p className="sm:w-1/2 w-full text-base font-normal pr-12">
            Kenali visi dan misi kami, temui manajemen, kisah perjalanan,
            penghargaan, keabsahan hukum, dampak yang telah tercipta, dan
            cabang-cabang kami. Bersama, mari terus menciptakan perubahan
            positif.
          </p>
        </div>
      </section>
      <section className="flex flex-col w-full h-[700px] sm:px-0 px-6">
        <div className="h-[700px] bg-gradient-to-b from-blue-500 to-white">
          <Image
            src="/Desktop - 21 (1).png"
            width={1440}
            height={600}
            alt="Who We Are Human Initiative"
            className="w-full h-[700px]"
          />
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-center items-center gap-y-10">
          <h5 className="text-sky-600 dark:text-sky-500 font-normal sm:text-2xl text-xl">
            Cerita Kami
          </h5>
          <h5 className="text-slate-700 dark:text-white font-semibold sm:text-5xl text-xl">
            Tentang Kami Human Initiative
          </h5>
          <div className="flex flex-col justify-center items-center gap-y-4">
            <p className="text-slate-500 text-center dark:text-slate-200 font-normal sm:text-base text-base">
              Human Initiative merupakan organisasi kemanusiaan global yang
              terus berupaya memberikan kebermanfaatan yang lebih bermakna
              dengan dukungan multipihak.
            </p>
            <p className="text-slate-500 text-center dark:text-slate-200 font-normal sm:text-base text-base">
              Didirikan di Indonesia pada 10 Desember 1999 Human Initiative
              menjalankan strategi Theory of Change (TOC) yang fokus kepada
              dampak positif pelaksanaan program bagi Masyarakat dan menjadikan
              Humanitarian-Development Nexus sebagai ruang lingkup program.
            </p>
            <p className="text-slate-500 text-center dark:text-slate-200 font-normal sm:text-base text-base">
              Hal ini diturunkan dalam empat pilar program utama, yakni
              Initiative for Empowerment, Initiative for Children, Initiative
              for Disaster Risk Management, dan Initiative for Infrastructure di
              mana manusia merupakan arus utama intervensi program.​
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-y-16">
          <Image
            src="/Assets-Maps-Human-Initiative.png"
            alt="Maps Human Initiatiative"
            width={1052}
            height={653}
          />
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-[100px] h-[70px] left-0 top-0"></div>
        <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-[100px] h-[70px] right-0 bottom-0"></div>
        <div className="flex flex-row justify-start items-center gap-x-10">
          <h5 className="text-slate-700 dark:text-white font-semibold sm:text-6xl text-xl">
            Our <span className="text-sky-600">Visions</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-medium sm:text-2xl text-base">
            Menggerakkan Kebaikan untuk Memartabatkan Manusia.​
          </p>
        </div>
        <div className="flex flex-row gap-x-16">
          <div className="bg-sky-300 w-1/4 h-[200px] rounded-xl">
            <Image
              src="/IMG_7781.jpg"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="bg-sky-500 w-1/4 h-[200px] rounded-xl">
            <Image
              src="/IMG_7807.jpg"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="bg-sky-400 w-1/4 h-[200px] rounded-xl">
            <Image
              src="/IMG_7829.jpg"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="bg-sky-600 w-1/4 h-[200px] rounded-xl">
            <Image
              src="/IMG_7844.jpg"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-row sm:gap-x-16 gap-x-10 sm:py-24 py-10 sm:px-28 px-6 dark:bg-slate-950 bg-sky-50">
        <div className="flex flex-col justify-center items-start gap-y-10 w-1/2">
          <h5 className="text-slate-700 dark:text-white font-semibold text-6xl">
            Our <span className="text-sky-600">Missions</span>
          </h5>
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-row gap-x-8">
              <span className="">
                <Building className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5 className="text-slate-800 dark:text-white font-semibold text-xl">
                  Organisasi
                </h5>
                <p className="text-slate-600 dark:text-white font-normal text-base">
                  Mengokohkan tata kelola organisasi yang adaptif, inovatif, dan
                  berdaya jangkau global.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-8">
              <span className="">
                <AlignVerticalDistributeCenter className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5 className="text-slate-800 dark:text-white font-semibold text-xl">
                  Sumber Daya
                </h5>
                <p className="text-slate-600 dark:text-white font-normal text-base">
                  Menguatkan kolaborasi inklusif antar pemangku kepentingan
                  dalam penanggulangan krisis kemanusiaan dan pembangunan
                  masyarakat.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-8">
              <span className="">
                <Slack className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5 className="text-slate-800 dark:text-white font-semibold text-xl">
                  Dampak
                </h5>
                <p className="text-slate-600 dark:text-white font-normal text-base">
                  Mengembangkan program dengan mengoptimalkan sumber daya
                  masyarakat untuk mendorong kemandirian.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-16">
          <Image
            src="/IMG_7811.jpg"
            width={500}
            height={500}
            alt="misi Human Initiative"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-start items-center gap-x-10">
          <div className="w-1/2 ">
            <Image
              src="/DSC00794 (1).jpg"
              alt="Positioning Organizations Human Initiative"
              width={800}
              height={800}
              className="w-full h-full rounded-2xl"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-y-10">
            <h5 className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl">
              Budaya <span className="text-sky-600">Organizations</span>
            </h5>
            <div className="grid grid-cols-3">
              <div className="flex flex-col gap-y-6">
                <span className="w-full">
                  <DatabaseZap className="text-slate-800" />
                </span>
                <h5 className="text-sky-800 text-base font-normal ">Berdaya</h5>
              </div>
              <div className="flex flex-col gap-y-6">
                <span className="w-full">
                  <HeartHandshake className="text-slate-800" />
                </span>
                <h5 className="text-sky-800 text-base font-normal ">
                  Kolaborasi
                </h5>
              </div>
              <div className="flex flex-col gap-y-6">
                <span className="w-full">
                  <SunSnow className="text-slate-800" />
                </span>
                <h5 className="text-sky-800 text-base font-normal ">Amanah</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-start items-center gap-x-10">
          <div className="flex w-1/2 flex-col gap-y-8">
            <h5 className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl">
              Positioning <span className="text-sky-600">Organizations</span>
            </h5>
            <p className="text-p-16">
              Organisasi kemanusiaan berdaya jangkau global yang diinisiasi oleh
              Muslim Indonesia, yang berperan sebagai katalisator perubahan
              dalam membangun resiliensi masyarakat yang berkelanjutan.
            </p>
          </div>
          <div className="w-1/2 ">
            <Image
              src="/DSC00796.jpg"
              alt="Positioning Organizations Human Initiative"
              width={800}
              height={800}
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-center items-center gap-y-10 w-full">
          <h5 className="text-slate-700 text-center w-full dark:text-white font-semibold text-5xl">
            Meet Our <span className="text-sky-600">Management</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base text-center">
            Kami selalu bergerak bersama untuk membawa perubahan positif. Kami
            percaya dengan kerja sama, masa depan bisa menjadi lebih baik dan
            penuh dengan peluang baru.
          </p>
        </div>
        <div className="flex flex-row gap-x-16">
          {teams.map((teams, index) => (
            <div key={index} className="w-1/4 flex flex-col gap-y-4">
              <div className="">
                <Image
                  src={teams.image}
                  width={500}
                  height={500}
                  alt={teams.nama}
                  className="w-full h-[410px] rounded-lg object-cover"
                />
              </div>
              <h5 className="text-sky-600 dark:text-white text-2xl font-semibold">
                {teams.nama}
              </h5>
              <p className="text-slate-500 dark:text-slate-300 text-base">
                {teams.jabatan}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-16 gap-y-10 sm:py-16 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white w-full">
        <div className="flex flex-col justify-center items-center gap-y-6 w-full">
          <h5 className="text-slate-700 text-center dark:text-white font-semibold text-5xl">
            Our <span className="text-sky-600">Story</span>
          </h5>
          <p className="text-slate-700 dark:text-white font-normal text-lg text-center">
            Bagi kami, sejarah adalah inspirasi untuk terus melakukan yang
            terbaik hari ini dan masa mendatang.
          </p>
        </div>
        <div className="slider-container">
          <Slider {...slideStories}>
            {stories.map((story, index) => (
              <div
                key={index}
                className="slide-stories inline-block py-4 w-[500px]"
              >
                <div className="slide-content flex sm:flex-row sm:gap-x-10 flex-col gap-y-8 w-full h-[200px]">
                  <span className="w-[260px] h-[260px] rounded-3xl">
                    <Image src="/DSC04008-2048x1365.jpg" alt="Human Initiative Story" width={400} height={400} className="w-full h-full rounded-3xl object-cover"/>
                  </span>
                  <h3 className="flex-1 text-lg font-medium text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-white py-3 px-6 rounded-t-3xl rounded-r-3xl rounded-b-none rounded-tl-3xl">
                    {story.description}
                  </h3>
                </div>
                <div className="slide-border-year mt-[96px] pt-[32px] relative border-t-[3px] border-solid h-max border-slate-300">
                  <time className="mb-1 text-3xl font-semibold leading-none text-slate-400">
                    {story.year}
                  </time>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <motion.section
        className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-24 px-6 dark:bg-slate-950 mx-4 rounded-3xl"
        animate={{
          backgroundColor: ["#e0f2fe", "#dbeafe", "#fff"], // Tailwind colors: sky-100, sky-200, blue-100
        }}
        transition={{
          duration: 3, // Smooth transition over 6 seconds
          repeat: Infinity, // Infinite loop
          repeatType: "reverse", // Reverse the animation
        }}
      >
        <div className="flex flex-row justify-center items-center gap-x-6 w-full">
          <h5 className="text-slate-700 text-center dark:text-white font-semibold text-5xl">
            Our <span className="text-sky-600">Award</span>
          </h5>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col relative gap-y-4 p-6 rounded-xl bg-slate-100"
            >
              <span className="absolute right-0">
                <Award className="text-sky-300 text-4xl w-12 h-12" />
              </span>
              <h5 className="text-slate-950 dark:text-white text-3xl font-semibold">
                {award.tahun}
              </h5>
              <h4 className="text-sky-700 dark:text-white text-lg font-medium">
                {award.judul}
              </h4>
              <p className="text-slate-500 dark:text-slate-300 text-base">
                {award.keterangan}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-start items-center gap-y-12">
          <div className="flex w-[1000px] flex-col gap-y-8">
            <h5 className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl">
              Our <span className="text-sky-600">Legality</span>
            </h5>
          </div>
          <Tabs defaultValue="terdaftar" className="w-[1000px]">
            <TabsList className="grid w-full grid-cols-4 gap-4">
              <TabsTrigger value="terdaftar">
                Terdaftar sebagai NGO di
              </TabsTrigger>
              <TabsTrigger value="anggota">Anggota dari</TabsTrigger>
              <TabsTrigger value="standarisasi">Standarisasi</TabsTrigger>
              <TabsTrigger value="manajemenmutu">
                Sistem Manajemen Mutu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="terdaftar">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (7).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Akta Notaris Pendirian Yayasan No. 9 10 Desember 1999
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (2).jpg"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Kementerian Sosial Republik Indonesia No. Registrasi
                    310/5/PI.02/06/2022
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (6).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Perserikatan Bangsa-Bangsa bidang Special Consultative
                    Status with the Economic and Social Council
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="anggota">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (5).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    HFI (Humanitarian Forum Indonesia)
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).webp"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Perhimpunan Filantropi Indonesia
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).gif"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Network for Empowered Aid Response (NEAR)
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (3).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    ICVA (International Council of Voluntary Agencies)
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="standarisasi">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).jpg"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Sphere International
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).webp"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    PSEA International
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="manajemenmutu">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (2).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    TUV Nord Indonesia
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-200 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 text-base font-normal">
                    Komisi Akreditasi Indonesia
                  </h5>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-center items-center gap-x-6 w-full">
          <h5 className="text-slate-700 text-center dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">Branch</span>
          </h5>
        </div>
        <div>
          <div className="flex space-x-4 justify-center items-center mb-8">
            <button
              className={`px-4 py-2 rounded-full ${
                selectedBranchType === "Pusat"
                  ? "bg-sky-500 dark:bg-white text-white"
                  : "dark:bg-slate-400 dark:text-white bg-slate-200"
              }`}
              onClick={() => setSelectedBranchType("Pusat")}
            >
              Pusat
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                selectedBranchType === "Cabang Indonesia"
                  ? "bg-sky-500 dark:bg-white text-white"
                  : "dark:bg-slate-400 dark:text-white bg-slate-200"
              }`}
              onClick={() => setSelectedBranchType("Cabang Indonesia")}
            >
              Cabang Indonesia
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                selectedBranchType === "Cabang Luar Indonesia"
                  ? "bg-sky-500 dark:bg-white text-white"
                  : "dark:bg-slate-400 dark:text-white bg-slate-200"
              }`}
              onClick={() => setSelectedBranchType("Cabang Luar Indonesia")}
            >
              Cabang Luar Indonesia
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredBranches.map((b, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">{b.namacabang}</h3>
                <p>{b.alamat}</p>
                <p>{b.negara}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-[240px] px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row gap-x-24">
          <div className="flex flex-col gap-y-3 w-1/2">
            <h6 className="text-sky-600 text-base font-normal">Contact Us</h6>
            <h5 className="text-slate-800 dark:text-slate-200 text-2xl font-medium">
              Bagaimana saya dapat membantu Anda?
            </h5>
            <p className="text-slate-400 dark:text-slate-100 text-base">
              Isi formulir atau kirimkan email
            </p>
            <div className="flex flex-col gap-y-8 mt-8">
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Phone className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  (021) 21287213
                </h6>
              </div>
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Mail className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  Human Initiative
                </h6>
              </div>
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Instagram className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  humaninitiative_id
                </h6>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 w-1/2 dark:bg-slate-700 py-8 px-4">
            <form action="" className="flex flex-col w-full gap-y-6">
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Nama"
              />
              <input
                type="email"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Email"
              />
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Subject"
              />
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Message"
              />
              <button
                type="submit"
                className="bg-sky-600 text-white dark:bg-slate-500 dark:text-slate-100 w-full py-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
