import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { newsHome } from '@/data/data'
import PopupNotif from '../../utility/PopupNotif'
import { MoveRight } from 'lucide-react';

const News = () => {
  const [notifMessage, setNotifMessage] = useState("");

  const learnMore = () => {
    setNotifMessage("Silahkan Login terlebih dahulu untuk melihat lebih lanjut.");
  }

  return (
    <section
          className={`scroll-smooth relative flex flex-col w-full sm:px-32 sm:py-20 p-6 dark:bg-slate-950 bg-sky-50`} id="#section-project-browse"
        >
          <div className="flex sm:flex-row flex-col justify-between sm:pb-20 pb-12">
            <h5
              className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700"
            >
             News and <br/> Stories
            </h5>
            <div className="flex flex-col gap-y-6 sm:w-1/2 w-full">
                <p className={`w-full flex justify-end items-center font-semibold text-sky-950 dark:text-slate-500 text-normal sm:w-full w-full pr-6`} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1000"
                >
                    Stay informed with latest development on human initiative campaigns to keep you engaged.
                </p>
                <button className="text-sky-500 bg-white border-sky-500 border py-3 px-3 rounded-lg w-[200px]">
                    See All News
                </button>
            </div>
          </div>
          <div
            className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}
          >
            {newsHome.map((donate, index) => (
              <div
                key={index}
                className={`bg-sky-50 dark:bg-slate-950 sm:pb-0 pb-6`}
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
              >
                <div className={`flex flex-col gap-y-4 rounded-xl`}>
                  <div className={`pb-4 `}>
                    <Image height={250} width={300} src={donate.image} alt={donate.name} className={`rounded-2xl w-full text-4xl text-blue-500`}/>
                  </div>
                  <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">{donate.tanggal}</span>
                  <h3 className={`text-sky-800 dark:text-white sm:text-base text-base font-semibold h-[60px] overflow-hidden`}>{donate.name}</h3>
                  <h6 className="text-slate-500 text-sm font-normal">
                    {donate.deskripsi}
                  </h6>
                  <Link href={donate.urlnews} 
                    className={`flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-500 dark:text-sky-500 inline-block bg-transparent font-medium text-normal p-1 hover:transition hover:ease-in-out`}
                    onClick={learnMore}
                  >
                        Read More <MoveRight/>
                  </Link>
                </div>
              </div>
            ))}
          </div> 
          <PopupNotif
                message={notifMessage}
                duration={3000}
                onClose={() => setNotifMessage("")}
            />
        </section>
  )
}

export default News