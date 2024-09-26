"use client"
import React, { useState } from "react";
import { joinProject } from "@/data/data";
import { Progress } from '@/components/ui/progress_fe';
import { AnimatePresence, motion } from "framer-motion";
import { DirectionAwareHover } from "../../direction-aware-hover";
import { Heart } from 'lucide-react';

const FundProject = () => {
  const [findProject, setFindProject] = useState("");

  const calculateProgress = (grossAmount: any): any => {
    const min = 50000;
    const max = 14000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  return (
    <section
      className={`p-24 flex flex-col gap-y-12 w-full dark:bg-slate-950 bg-sky-50`}
    >
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-y-4">
          <h5 className={`text-slate-700 dark:text-white font-semibold text-[36px]`}>Introduce Our Campaign</h5>
          <p className={`text-slate-500 dark:text-slate-500 font-medium text-sm`}>How do something great to help others</p>
        </div>
        <a href="#" className="text-sky-600 dark:text-sky-600 font-bold text-lg">
          Lihat Project Lainnya
        </a>
      </div>
      <div className="flex flex-row gap-x-8">
        {joinProject.map((projectItem) => (
          <div key={projectItem.nama} className="h-full flex flex-col justify-between rounded-2xl h-w-1/4">
            <div className="flex flex-col gap-y-4 h-[200px] py-4 px-6" style={{backgroundImage: `url(${projectItem.image})`, backgroundSize: 'cover'}}>
            </div>
            <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
              <div className="flex flex-col gap-y-4">
                <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">{projectItem.tipe}</span>
                <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">{projectItem.nama}</h6>
                <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">{projectItem.deskrispi}</h6>
                <Progress value={calculateProgress(projectItem.donasi)} />
              </div>
              <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4"><span><Heart className="text-red-500"/></span> {projectItem.dukungan} orang memberi dukungan</p>
              <div className="flex flex-row gap-x-8">
                <div className="w-2/3 flex flex-col justify-between items-start">
                  <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">Rp {projectItem.donasi}</h6>
                  <h6 className="text-slate-500 dark:text-slate-200 text-sm">Rp {projectItem.goals} target</h6>
                </div>
                <button className="w-1/3 bg-sky-700 text-white dark:text-white py-3 px-4 rounded-xl">Donate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundProject;
