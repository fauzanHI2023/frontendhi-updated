import React from 'react'
import BannerCareer from '@/components/ui/banner/BannerCareer'
import { career } from '@/data/data'
import { ChevronRight } from 'lucide-react'

const BeHumanitarianWorker = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <BannerCareer
        title="Bergabunglah Bersama Kami di Human Initiative"
        description="Temukan peran Anda di Human Initiative dan jadilah bagian dari tim yang berdedikasi untuk menciptakan perubahan nyata. Bersama-sama, kita bekerja menghadapi tantangan global dan memberikan dampak positif bagi masyarakat"
        titlepage="Career"
        image="/career_11zon.png"
      />
      <section className="flex flex-col gap-y-16 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col gap-y-4">
          <h5 className="title-xl-medium-blue">SHAPE YOUR CAREER, YOUR WAY</h5>
          <p className="text-p-16">Whether you are looking to further build your career or to gain hands-on internship experience, you can find a role that suits you best.</p>
        </div>
      </section>
      <section className="flex flex-col gap-y-16 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col gap-y-0">
          {career.map((careers, index) => (
            <div key={index} className="flex flex-row justify-between items-center border border-sky-300 px-8 py-6">
              <div className="flex flex-col justify-start gap-y-2">
                <h5 className="title-lg-medium-blue">
                  {careers.title}
                </h5>
                <p className="text-p-16">{careers.negara}&nbsp;({careers.kota})</p>
              </div>
              <span>
                <ChevronRight className="text-slate-500 text-2xl"/>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default BeHumanitarianWorker