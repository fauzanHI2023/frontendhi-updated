"use client"
import React, { useEffect, useState } from "react";
import { useTheme } from "@/src/context/ThemeProvider";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { mapData } from "@/src/data/map";
import AOS from "aos";
import 'aos/dist/aos.css';

const OurImpact = () => {

  const { theme } = useTheme();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className={`relative flex flex-col w-full sm:p-24 p-6 bg-${theme}-hi`}
    >
      <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
        <h5
          className={`text-${theme}-hi font-bold sm:text-3xl text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4`} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700"
        >
          the <span className="text-sky-500">Human Initiative</span> impact
        </h5>
        <p className={`text-${theme}-hi font-base text-normal sm:w-1/2 w-full pr-6`} data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1000"
        >
          human initiative is a non profit organization thats  works to improve the live of underprivileged children toughout the world. we provide children, disaster, empowerment and infrastructure 
        </p>
      </div>
      <div>
        <h1>World Map</h1>
      </div>
    </section>
  );
};

export default OurImpact;
