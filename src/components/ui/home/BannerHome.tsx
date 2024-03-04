"use client"
import React, { useEffect } from "react";
import AOS from "aos"
import 'aos/dist/aos.css';

const BannerHome : React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="flex flex-row w-full h-screen sm:p-24 p-6 sm:pt-24 pt-24 bg-hero-pattern sm:bg-cover bg-contain">
      <div className="flex sm:flex-row flex-col w-full">
        <div className="flex flex-col sm:w-1/2 w-full justify-center sm:pb-0 pb-8" data-aos="fade-left">
          <h3 className="text-white font-bold sm:text-5xl text-2xl sm:pb-10 pb-3">
            Helps <span className="font-black text-sky-600">connect</span> those who care with those who need help.
          </h3>
          <h6 className="text-white font-normal font-base">
            Lets work together to help our brothers and sisters who are being
            hit by a disaster. One upee from you is definitely valuable to them.
          </h6>
        </div>
        <div className="flex sm:w-1/2 w-full items-center justify-center" data-aos="fade-right">
          <div className="flex sm:w-1/2 w-full flex-col">
            <div className="flex flex-row pb-4">
              <div className="w-[219.05px] h-[40.87px] bg-white rounded-tl-[23px] rounded-bl-[23px] text-center">
                <a href="#" className="text-blue-950 text-sm font-bold tracking-tight">GIVE ONCE</a>
              </div>
              <div className="w-[219.05px] h-[40.87px] bg-indigo-950 rounded-tr-[23px] rounded-br-[23px] text-center">
                <a href="#" className="text-white text-sm font-bold tracking-tight">MONTHLY</a>
              </div>
            </div>
            <div className="card-donate flex flex-col rounded-lg">
              <div className="card-header bg-indigo-950 text-white p-4 text-center rounded-tl-[23px] rounded-tr-[23px]">
                <h5>Choose the amount to be given per month</h5>
              </div>
              <div className="card-body flex flex-col bg-white p-4">
                <div className="flex flex-wrap pb-4">
                  <a className="bg-zinc-100 rounded-[23px] shadow border border-gray-400 py-3 px-4 text-neutral-400 text-sm">Rp 10.000</a>
                </div>
                <a href="#" className="w-full bg-indigo-950 rounded-[50px] text-white py-3 px-4 text-center">JOIN NOW</a>
              </div>
              <div className="card-footer flex flex-col bg-indigo-950 text-white p-8 text-center rounded-bl-[23px] rounded-br-[23px]">
                <p>Your monthly donation of 50.000 can</p>
                <p>provide assistance to people in need.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
