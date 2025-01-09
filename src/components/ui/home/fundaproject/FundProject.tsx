"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress_fe";
import { fetchCampaign } from "@/lib/donation/campaign/auth-campaign";
import { Heart } from "lucide-react";
import Link from "next/link"

const FundProject = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setIsLoading(true);
        const campaigns = await fetchCampaign();
        setProjects(campaigns.data || []); // Pastikan campaigns adalah array
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setIsLoading(false);
      }
    };

    getProjects();
  }, []);

  const calculateProgress = (grossAmount: number): number => {
    const min = 50000;
    const max = 14000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  if (isLoading) {
    return (
      <div className="p-24 text-center">
        <p>Loading campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-24 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-24 text-center">
        <p>No campaigns found.</p>
      </div>
    );
  }

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || "0");
    return `Rp ${parsedValue.toLocaleString("id-ID")}`;
  };

  return (
    <section
      className="p-24 flex flex-col gap-y-12 w-full dark:bg-slate-950 bg-sky-50"
    >
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-y-4">
          <h5 className="text-slate-700 dark:text-white font-semibold text-[36px]">
            Every Donation Brings New Hope
          </h5>
          <p className="text-slate-500 dark:text-slate-500 font-medium text-sm">
            Let’s Make It Happen Together!
          </p>
        </div>
        <a
          href="#"
          className="text-sky-600 dark:text-sky-600 font-bold text-lg"
        >
          See other Campaign​
        </a>
      </div>
      <div className="flex felx-col sm:grid sm:grid-cols-4 gap-x-8 flex-wrap">
        {projects.slice(0, 4).map((projectItem: any) => (
          <div
            key={projectItem.id}
            className="h-full flex flex-col justify-between rounded-2xl"
          >
            <Link href={`/campaign/${projectItem.slug}`}>
              <div
                className="publikasi-card flex flex-col gap-y-4 h-[200px] py-4 px-6"
                style={{
                  backgroundImage: `url(${projectItem.image || "/donate1.jpeg"})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </Link>
            <div className="flex flex-col py-4 px-6 dark:bg-slate-900 bg-white">
              <div className="flex flex-col gap-y-4">
                <span className="flex text-sky-500 dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                  children
                </span>
                <Link href={`/campaign/${projectItem.slug}`}>
                  <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                    {projectItem.campaign_name}
                  </h6>
                </Link>
                <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                  {projectItem.campaign_description}
                </h6>
                <Progress value={calculateProgress(projectItem.donation_collected || 0)} />
              </div>
              <p className="text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                <span>
                  <Heart className="text-red-500" />
                </span>
                {projectItem.support} orang memberi dukungan
              </p>
              <div className="flex flex-row gap-x-8">
                <div className="w-2/3 flex flex-col justify-between items-start">
                  <h6 className="text-sky-500 dark:text-sky-500 text-lg font-medium">
                  {formatCurrency(projectItem.donation_collected)}
                  </h6>
                  <h6 className="text-slate-500 dark:text-slate-200 text-sm">
                  {formatCurrency(projectItem.target_donation)}
                  </h6>
                </div>
                <button className="w-1/3 bg-sky-700 text-white dark:text-white py-3 px-4 rounded-xl">
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundProject;
