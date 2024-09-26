import React from "react";
import Banner from "@/components/ui/banner/Banner";
import { Flame, TimerReset, BedDouble } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-program";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";

const InitiativeForDisaster = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title="Program Disaster"
        description="Program pendidikan dan keterampilan untuk anak yatim dan duafa."
        image="/rightholders33.png"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <Boxes />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Disaster</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Disaster merupakan kumpulan dari berbagai program
            yang bertujuan mengurangi dampak bencana, melalui pemberdayaan
            potensi dan kapasitas masyarakat untuk mengenali potensi bencana,
            dan membuat persiapan menghadapi bencana. Selain tindakan preventif,
            persiapan tim yang akan dikerahkan jika terjadi bencana juga turut
            menjadi perhatian pada berbagai program disaster.
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
              <TimerReset className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <BedDouble className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="penguranganresikobencana" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-8 relative z-20">
            <TabsTrigger
              value="penguranganresikobencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Flame className="text-sky-600" /> Pengurangan Resiko Bencana
            </TabsTrigger>
            <TabsTrigger
              value="tanggapdarurat"
              className="w-max-content flex flex-row gap-x-2"
            >
              <BedDouble className="text-sky-600" /> Tanggap Darurat
            </TabsTrigger>
            <TabsTrigger
              value="pemulihanpascabencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <TimerReset className="text-sky-600" /> Pemulihan Pasca Bencana
            </TabsTrigger>
          </TabsList>
          <TabsContent value="penguranganresikobencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Bertujuan untuk mengurangi ancaman bencana dan mengurangi dampak
                buruk dari suatu ancaman bencana dengan cara mengedukasi
                seseorang atau suatu komunitas.
              </p>
              <p className="text-base font-normal text-slate-700 relative z-20">
                Diantara programnya adalah:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-base font-normal text-slate-700">
                  Kampung Tangguh
                </li>
                <li className="text-base font-normal text-slate-700">
                  Sekolah Aman
                </li>
                <li className="text-base font-normal text-slate-700">
                  Komunikasi Informasi dan Edukasi
                </li>
                <li className="text-base font-normal text-slate-700">
                  Sistem Peringatan Dini
                </li>
                <li className="text-base font-normal text-slate-700">
                  Planet Volunteer
                </li>
                <li className="text-base font-normal text-slate-700">
                  Keluarga Tanggap Bencana
                </li>
                <li className="text-base font-normal text-slate-700">
                  Perubahan Iklim
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tanggapdarurat">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Serangkaian kegiatan yang dilakukan dengan segera pada saat
                kejadian bencana untuk menangani dampak buruk yang ditimbulkan,
                meliputi kegiatan penyelamatan dan evakuasi korban, harta benda,
                pemenuhan kebutuhan dasar, perlindungan, pengurusan pengungsi,
                penyelamatan, serta pemulihan prasarana dan sarana. (UU No. 24
                tahun 2007 tentang Penanggulangan Bencana)
              </p>
              <p className="text-base font-normal text-slate-700 relative z-20">
                Diantara programnya adalah Rescue SAR yaitu Kegiatan dan usaha
                mencari, menolong, dan menyelamatkan jiwa manusia yang hilang
                atau dikhawatirkan hilang atau menghadapi bahaya yang disebabkan
                oleh bencana alam/bencana non alam.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="pemulihanpascabencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Suatu proses yang dilalui agar kebutuhan pokok terpenuhi setelah
                terjadinya bencana, baik bencana alam maupun bencana sosial akan
                dilakukan oleh tim recovery bencana.
              </p>
              <p className="text-base font-normal text-slate-700 relative z-20">
                Ada berbagai kegiatan yang dilakukan oleh tim recovery, di
                antaranya yaitu Dukungan Psikososial Bantuan yang diberikan
                kepada individu dan masyarakat yang mengalami gangguan
                psikologis, dimana bantuan ini dilakukan secara terus menerus
                dan saling mempengaruhi antara aspek psikologis dan aspek sosial
                dalam lingkungan dimana individu atau masyarakat berada.
              </p>
              <p className="text-base font-normal text-slate-700 relative z-20">
                lalu ada pula Emergency Relief yaitu Program pemenuhan kebutuhan
                dasar bagi warga terdampak bencana di masa tanggap darurat
                secara cepat, tepat, dan bermartabat dengan ruang lingkup:
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 relative z-20">Hunian</li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Air, Sanitasi dan Promosi Kesehatan
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Ketahanan Pangan/Nutrisi
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Kebutuhan Keluarga
                </li>
              </ul>
              <div className="w-full relative z-20">
                <Image src="/IMG_5460_11zon.jpg" width={400} height={400} alt="Human Initiative Disaster" className="w-[400px] rounded-xl"/>
              </div>
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
            <div className="w-full relative z-20">
              <Image src="/water-well.jpg" width={400} height={400} alt="Human Initiative Disaster" className="w-[400px] rounded-xl"/>
            </div>
            <div className="flex flex-col gap-y-6 relative z-20">
              <h5 className="text-slate-700 font-semibold text-lg">Water Well, Kolaborasi Kebaikan Human Initiative bersama</h5>
              <p className="text-slate-600 font-normal text-base">Serang, Banten – Salah satu program sarana air bersih Human Initiative, Water Well, kembali hadir di pelosok Indonesia.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InitiativeForDisaster;
