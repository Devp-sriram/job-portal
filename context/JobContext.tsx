'use client'
import React, { createContext, useContext } from "react";
import useSWR from "swr";

export interface Job {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: { min: number; max: number };
  deadline: string;
  description: string;
}

interface JobContextValue {
  jobs: Job[];
  mutateJobs: (data?: Job[] | Promise<Job[]>, shouldRevalidate?: boolean) => void;
}

const JobContext = createContext<JobContextValue | null>(null);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR<Job[]>("/api/getJob", fetcher);

  return (
    <JobContext.Provider value={{ jobs: data || [], mutateJobs: mutate }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJobs must be used within JobProvider");
  return ctx;
};
