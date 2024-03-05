"use client"
import React from "react";
import { useTheme } from "@/context/ThemeProvider";

const FundProject = () => {
  const { darkTheme } = useTheme();
  return (
    <section
      className={`p-24 bg-${
        darkTheme ? "hi-dark" : "hi-darklight"
      } flex flex-col w-full`}
    >
      <div className="flex flex-row justify-between">
        <h5 className={`text-${
            darkTheme ? "hi-darklight" : "hi-dark"
          } font-bold text-2xl`}>Fund A Project</h5>
        <a href="#" className="text-white font-bold text-lg">
          See More Campaign
        </a>
      </div>
      <div></div>
    </section>
  );
};

export default FundProject;
