"use client";
import React, { useState, useEffect } from "react";
import {
  HandCoins,
  SmilePlus,
  HeartHandshake,
  NotepadText,
  Repeat,
  ClipboardCheck,
  MoveRight,
} from "lucide-react";
import { programCSR } from "@/data/data";
import Link from "next/link";
import Image from "next/image";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import { ExpandableCardDemo } from "@/components/ui/cardback";

const CSRServices = () => {
  const [notifMessage, setNotifMessage] = useState("");
  const [showCollab, setShowCollab] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCollab((prev) => !prev);
    }, 7000); // Ubah setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  const typingAnimation = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
      },
    }),
  };

  const collabText =
    "Di tengah tantangan global yang semakin kompleks, kolaborasi menjadi kunci utama untuk menciptakan perubahan nyata.";

  const humanText =
    "Human Initiative Collaboration Impact";

  const learnMore = () => {
    setNotifMessage(
      "Silahkan Login terlebih dahulu untuk melihat lebih lanjut."
    );
  };

  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <section className="scroll-smooth flex flex-row w-full sm:h-[858px] h-screen sm:p-24 p-6 sm:pt-34 pt-24 dark:bg-hero-csr-dark bg-hero-csr-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col justify-center items-center w-full">
          <div
            className="flex flex-col gap-y-8 sm:w-2/4 w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-y-24">
              <h3 className="font-medium leading-none sm:text-[90px] text-2xl dark:text-white text-[#002C4A]">
                Kolaborasi Berdampak
              </h3>
            </div>
            <h6 className="text-sm text-xl font-base" data-aos="fade-left">
              Berkolaborasi dalam beragam program yang selaras dengan tujuan
              pembangunan berkelanjutan
            </h6>
            <a
              href="#section-project-browse"
              className="rounded bg-sky-600 dark:bg-sky-500 dark:text-white text-white py-4 px-6 w-[200px]"
            >
              Program Sponsor
            </a>
          </div>
          <div
            className="image-collaboration-impact flex sm:w-2/4 w-full items-center justify-center"
            data-aos="fade-right"
          >
            <Image
              src="/collaborationberdampak.png"
              width={900}
              height={860}
              alt="Work together.png"
            />
            <div className="relative">
              <div className="bg-white/75 absolute flex flex-row w-[320px] gap-x-3 py-3 px-4 rounded-xl border border-gray-300 right-10 top-2/4">
                <span>
                  <IoCheckmarkDoneCircleSharp className="text-green-400 w-[50px] h-[50px]"/>
                </span>
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-base">Apakah kamu tahu Collaboration Impact?</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-row gap-x-16 justify-center items-center sm:p-24 p-6 sm:w-4/5 w-full">
        <div className="sm:w-1/2 w-full">
          <Image src="/collaboration-sec-1.png" width={474} height={443} alt="Collaboration Human Initiative"/>
        </div>
        <div className="flex flex-col gap-y-10 sm:w-1/2 w-full">
          <span className="text-sm font-normal text-slate-600 dark:text-white">Human Initiative</span>
          <h4
            className={`text-slate-800 dark:text-white font-semibold sm:text-[54px] text-2xl sm:w-1/3 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Collaborative Impact{" "}
          </h4>
          <p className="text-base w-full leading-6">
            Di tengah tantangan global yang semakin kompleks, kolaborasi menjadi
            kunci utama untuk menciptakan perubahan nyata. Human Initiative
            mengajak berbagai pihak, terutama sektor korporasi, institusi maupun
            organisasi lainnya untuk bersama-sama mengambil peran strategis dalam
            mewujudkan pembangunan masyarakat yang berkelanjutan. <br /> Human
            Initiative percaya bahwa kolaborasi adalah kunci untuk menciptakan
            dampak positif yang lebih luas. Kita dapat menciptakan dampak yang
            lebih besar, memberdayakan masyarakat, dan memastikan kesejahteraan
            jangka panjang.
          </p>
        </div>
      </section>
      <section className="flex flex-row gap-x-16 justify-center items-center sm:p-24 p-6 w-full">
        <div className="flex sm:flex-row flex-col w-4/5 gap-x-14">  
          <div className="sm:w-1/2 w-full">
            <p className="text-base leading-6 pb-6 w-full">
              Human Initiative membuka program kolaboratif yang menggalang
              berbagai sumber daya dan keahlian untuk menyelesaikan masalah
              sosial seperti kemiskinan, pendidikan, kesehatan, dan bencana
              alam. Melalui kerja sama dengan mitra dari berbagai sektor,
              program ini akan menciptakan solusi berkelanjutan yang memberikan
              manfaat nyata bagi masyarakat yang membutuhkan. Keberhasilannya
              diukur dari perubahan signifikan yang dihasilkan dalam kehidupan
              mereka.
            </p>
            <p className="text-base leading-6 pb-6 w-full">
              Kami percaya bahwa kemitraan ini tidak hanya akan memperkuat
              tanggung jawab sosial perusahaan atau institusi, tetapi juga
              memberikan kontribusi nyata dalam membangun masa depan yang lebih
              baik untuk semua.
            </p>
            <p className="text-base leading-6 pb-6 w-full">
              Mari bersama-sama menjadikan visi ini sebuah kenyataan, di mana
              setiap langkah yang kita ambil bersama, membawa kita lebih dekat
              ke masyarakat yang inklusif, berdaya, dan berkelanjutan.
            </p>
          </div>
          <div className="animation-word sm:w-1/2 w-full h-[478px] relative">
            <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-1/6 h-[70px] left-3/4"></div>
            <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-1/6 h-[70px] left-3/4 bottom-2/4"></div>
            {showCollab ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl"
                key="collab"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Image src="/collaboration-sec-2.png" alt="Collaboration Impact" width={342} height={478} className="h-[478px] w-[342px] rounded-3xl"/>
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl"
                key="human"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Image src="/collaboration-sec-2-2.png" alt="Collaboration Impact" width={342} height={478} className="h-[478px] w-[342px] rounded-3xl"/>
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <section className="scroll-smooth flex flex-col gap-y-20 w-full sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center items-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <h3 className="font-sm text-base w-full text-sky-500 text-center ">
                CSR Services
              </h3>
            </div>
            <h6
              className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-[#002C4A]"
              data-aos="fade-left"
            >
              Layanan Kami
            </h6>
          </div>
        </div>
        <div className="flex flex-row gap-x-8 gap-y-8 py-4 px-6">
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-yellow-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <HandCoins className="text-yellow-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                Community Services
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Implementasi Program CSR berupa aktifitas charity pada lokasi
                yang ditunjuk oleh korporasi/institusi
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-pink-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <SmilePlus className="text-pink-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                CSI
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Menilai sejauh mana kepuasan masyarakat atau tingkat kepuasan
                terhadap program sosial yang diinisiasi korporasi/institusi,
                baik secara kualitatif maupun kuantitatif.
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <HeartHandshake className="text-blue-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                Creating Shared Value
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Tingkatkan nilai-nilai kompetitif korporasi/intitusi dan secara
                bersamaan memajukan kondisi sosial dan ekonomi
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-green-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <NotepadText className="text-green-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                Social Mapping
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Identifikasi program sosial apa yang benar-benar dibutuhkan oleh
                masyarakat dan sesuai dengan visi korporasi/institusi
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-indigo-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Repeat className="text-indigo-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                SROI (Social Return On Investment)
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Membantu korporasi/institusi memahami dan mengelola nilai
                sosial, lingkungan, dan ekonomi yang dihasilkan
              </p>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-sky-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <ClipboardCheck className="text-sky-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <h5 className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg">
                Proper
              </h5>
              <p className="text-center text-slate-500 font-sm text-sm leading-[1.8]">
                Parameter penilaian dari korporasi/institusi terkait dengan
                aktivitasnya dalam mengelola sektor lingkungan hidup.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`scroll-smooth relative flex flex-col w-full sm:px-32 sm:py-20 p-6 dark:bg-slate-950 bg-sky-50`}
        id="#section-project-browse"
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Humanity Project <span className="text-sky-400">Browse</span>
          </h5>
          <p
            className={`flex justify-end items-center font-semibold text-sky-950 dark:text-slate-500 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            We help survivors of war rebuild their lives and choose their own
            futures
          </p>
        </div>
        <Tabs defaultValue="children">
          <TabsList className="pb-6">
            <TabsTrigger value="all">Lihat Semua</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="disaster">Disaster</TabsTrigger>
            <TabsTrigger value="empowerment">Empowerment</TabsTrigger>
            <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ExpandableCardDemo/>
          </TabsContent>
          <TabsContent value="children" className="flex flex-row gap-x-4">
            <ExpandableCardDemo/>
          </TabsContent>
          <TabsContent value="disaster">
            <ExpandableCardDemo/>
          </TabsContent>
          <TabsContent value="empowerment">
            <ExpandableCardDemo/>
          </TabsContent>
          <TabsContent value="infrastruktur">
            <ExpandableCardDemo/>
          </TabsContent>
        </Tabs>
      </section>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default CSRServices;
