"use client";
import React, { useState, useEffect } from "react";
import Banner from "@/components/ui/banner/Banner";
import { MoveRight } from "lucide-react";
import { rightHolders } from "@/data/data";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const wordFlips = `Jadilah Bagian Dari Perubahan Bersama Kami`;

const Rightholders = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep: any) => (prevStep < 2 ? prevStep + 1 : 1));
    }, 15000); // Total duration: 12 seconds + 1 second buffer

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init();
  });
  return (
    <main className="">
      <section className="flex flex-row w-full h-[1000px] sm:p-24 p-6 sm:pt-40 pt-24 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <h3 className="w-1/2">
                <TextGenerateEffect words={wordFlips} className="text-center"/>
              </h3>
              <h6
                className="w-1/2 font-light text-base text-center"
                data-aos="fade-left"
              >
                Daftarkan diri Anda sebagai Calon Pemegang Hak Program untuk
                mendapatkan bantuan kemanusiaan dan menciptakan perubahan
                positif bersama kami.
              </h6>
            </div>
          </div>
          <div
            className="animation-image-rightholders rounded flex bg-background h-[500px] sm:w-full w-full items-center justify-center"
            data-aos="fade-left"
          >
            {/* Flow 1: Logo and "Righholders" text */}
            {step === 1 && (
              <div className="flex flex-row gap-x-12 py-16 px-24 w-full justify-center items-center bg-background h-[500px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders1.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders2.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders3.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders4.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
              </div>
            )}

            {/* Flow 2: "Righholders" text on the left and grid images on the right */}
            {step === 2 && (
              <div className="flex flex-row gap-x-12 py-16 px-24 w-full justify-center items-center bg-background h-[500px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders5.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders6.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders7.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders8.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-row w-full sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center items-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <h3 className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-[#002C4A]">
                Apa itu CPHP?
              </h3>
            </div>
            <h6
              className="font-sm text-base w-3/4  text-center"
              data-aos="fade-left"
            >
              Calon Pemegang Hak Program (CPHP) adalah Individu atau Komunitas
              yang memenuhi kriteria tertentu untuk menjadi penerima program
              bantuan kemanusiaan yang dijalankan oleh Human Initiative. Adapun
              program yang dapat diakses oleh masyarakat terdiri atas bidang
              pendidikan, kesehatan, ekonomi dan sosial kemanusiaan.
            </h6>
          </div>
        </div>
      </section>
      <section className="flex flex-row w-full h-[600px] sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div className="flex justify-center w-1/2">
            <Image
              src="/Group 913 (4).png"
              width={520}
              height={460}
              alt="Rightholders Human Initative"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-8">
            <h6 className="text-base font-normal text-sky-500">CPHP</h6>
            <h3 className="font-medium sm:text-[50px] text-2xl leading-[50px] dark:text-white text-[#002C4A]">
              Kami Membantu Yang Membutuhkan Siapa
            </h3>
            <h4 className="font-normal text-sm">
              Daftarkan diri anda untuk menjadi calon pemegang hak program
            </h4>
          </div>
        </div>
      </section>
      <section
        className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6 dark:bg-slate-900 bg-sky-50`}
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Good Helping <span className="text-sky-500">Humanity</span>
          </h5>
          <p
            className={`flex justify-end items-center font-semibold text-sky-950 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            We help survivors of war rebuild their lives and choose their own
            futures
          </p>
        </div>
        <div className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}>
          {rightHolders.map((donate, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-950 sm:pb-0 pb-6`}
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className={`flex flex-col gap-y-4 py-4 px-6 rounded-xl`}>
                <h3
                  className={`sm:text-base text-base text-center font-semibold sm:pb-6 pb-3 h-[80px] overflow-hidden`}
                >
                  {donate.name}
                </h3>
                <h3
                  className={`sm:text-sm text-sm text-center text-slate-400 dark:text-slate-300 font-normal sm:pb-6 pb-3 h-[60px] overflow-hidden`}
                >
                  {donate.description}
                </h3>
                <Link
                  href={donate.url}
                  className={`flex flex-row gap-x-2 justify-center items-center w-full text-center rounded-lg text-sky-500 dark:text-sky-500 p-2 inline-block bg-transparent font-medium text-normal p-1 hover:transition hover:ease-in-out`}
                >
                  Ajukan <MoveRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Rightholders;
