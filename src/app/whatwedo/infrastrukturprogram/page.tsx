import React from "react";
import Banner from "@/components/ui/banner/Banner";
import { Baby, University, Backpack } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-program";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import { MdOutlineMosque } from "react-icons/md";
import { FaHandsWash } from "react-icons/fa";
import { LuSchool2 } from "react-icons/lu";
import { GiSuspensionBridge } from "react-icons/gi";

const InfrastructureProgram = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title="Infrastrukture Program"
        description="Program pendidikan dan keterampilan untuk anak yatim dan duafa."
        image="/rightholders35.png"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <Boxes />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Infrastruktur <span className="text-sky-600">Program</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Infrastructure merupakan program Human Initiative
            dalam upaya mewujudkan kesejahteraan melalui peningkatan kualitas
            infrastruktur masyarakat di dalam dan luar negeri. Pelaksanaan
            dilakukan melalui program reguler atau program pemulihan
            pascabencana(recovery).
          </p>
        </div>
        {/* <div className="flex flex-row gap-x-16 justify-center items-center w-2/3">
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-green-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Baby className="text-green-500 text-xl w-8 h-8" />
            </span>
            <h5>Perlindungan Anak</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-sky-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <University className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Backpack className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="masjid" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-8 relative z-20">
            <TabsTrigger
              value="masjid"
              className="w-max-content flex flex-row gap-x-2"
            >
              <MdOutlineMosque className="text-sky-600" /> Masjid
            </TabsTrigger>
            <TabsTrigger
              value="wash"
              className="w-max-content flex flex-row gap-x-2"
            >
              <FaHandsWash className="text-sky-600" /> Wash
            </TabsTrigger>
            <TabsTrigger
              value="sekolah"
              className="w-max-content flex flex-row gap-x-2"
            >
              <LuSchool2 className="text-sky-600" /> Sekolah
            </TabsTrigger>
            <TabsTrigger
              value="jembatan"
              className="w-max-content flex flex-row gap-x-2"
            >
              <GiSuspensionBridge className="text-sky-600" /> Jembatan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="masjid">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Masjid bukan hanya sebagai tempat ibadah, tetapi juga sebagai
                pusat kegiatan sosial dan pendidikan bagi masyarakat lokal.
                Program ini melibatkan sumber daya lokal, termasuk tenaga kerja
                setempat, tukang batu, tukang kayu, dan pengrajin lokal untuk
                membangun masjid. Dalam hal ini, pembangunan masjid dapat
                menjadi pusat komunitas yang mendukung pendidikan agama,
                pelatihan keterampilan, serta memberikan tempat bagi warga untuk
                beribadah dan berkumpul.
              </p>
              <p className="text-base font-normal text-slate-700 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
              <Image
                src="/PROGRES-100-4-1-2048x1152 (2).jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20"
              />
            </div>
          </TabsContent>
          <TabsContent value="wash">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Akses ke air bersih adalah hak asasi manusia, dan pembangunan
                sumber air bersih sangat penting. Program ini mencakup pembuatan
                sumur bor, pengembangan sistem distribusi air, dan penyediaan
                pelatihan bagi warga setempat dalam pengelolaan air. Dengan
                melibatkan komunitas dalam pemeliharaan dan pengelolaan sumber
                air, program ini dapat berkelanjutan dan memberdayakan
                masyarakat setempat.
              </p>
              <Image
                src="/IMG_3814-2048x1365.jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20"
              />
              <p className="text-base font-normal text-slate-700 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="sekolah">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Sekolah adalah langkah penting untuk meningkatkan pendidikan di
                daerah tersebut. Program ini mencakup pembangunan gedung
                sekolah, penyediaan peralatan pendidikan, dan pelatihan guru
                lokal. Sumber daya lokal dapat dimanfaatkan dalam pembangunan
                sekolah, seperti pekerjaan konstruksi, penyediaan makanan
                sekolah dari petani lokal, dan melibatkan komite sekolah dalam
                pengelolaan sekolah.
              </p>
              <Image
                src="/DSC04008-2048x1365.jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20"
              />
              <p className="text-base font-normal text-slate-700 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="jembatan">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Jembatan dapat menghubungkan wilayah yang sebelumnya terisolasi,
                memudahkan akses ke pasar, layanan kesehatan, dan pendidikan.
                Program ini mempekerjakan insinyur dan tenaga kerja lokal untuk
                membangun jembatan. Selain itu, program ini juga dapat mencakup
                pelatihan bagi warga setempat tentang pemeliharaan dan manajemen
                jembatan.
              </p>
              <Image
                src="/DJI_0505-2048x1536.jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20"
              />
              <p className="text-base font-normal text-slate-700 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-28 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-slate-50 relative z-20">
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">Publikasi</span> Terkait
          </h5>
        </div>
        <div className="flex flex-row gap-x-16 w-full">
          <div className="w-1/4 flex flex-col gap-y-4">
            <div className="w-full">
              <Image
                src="/water-well.jpg"
                width={400}
                height={400}
                alt="Human Initiative Disaster"
                className="w-[400px] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-y-6">
              <h5 className="text-slate-700 font-semibold text-lg">
                Water Well, Kolaborasi Kebaikan Human Initiative bersama
              </h5>
              <p className="text-slate-600 font-normal text-base">
                Serang, Banten – Salah satu program sarana air bersih Human
                Initiative, Water Well, kembali hadir di pelosok Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InfrastructureProgram;
