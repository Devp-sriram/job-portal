'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import sendJobs from '@/utils/sendJobs'
import { useJobs } from "@/context/JobContext";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';

type PopupHostProps = {
  onClose: () => void;
};

const imageArr = ['./amazon.svg','./tesla.svg','./swiggy.svg']

export default function PopupHost({ onClose }: PopupHostProps) {
  const [formData, setFormData] = useState<HostForm>({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType:"",
    salary: {min:0,max:0}, 
    deadline:"",
    description: "",
    image:''
  });
  const { jobs, mutateJobs } = useJobs();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const randomIndex = Math.floor(Math.random() * 3); // 0, 1, or 2

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const result = await sendJobs(formData ,jobs , mutateJobs);
      if (result.success) {
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          jobType:"",
          salary: {min:0,max:0}, 
          deadline:"",
          description: "",
          image:''
        });

        setLoading(false);
        onClose()
      } else {
        setLoading(false);
        console.error('Submission failed:', result.error);
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Enter the job title";
    if (!formData.companyName) newErrors.companyName = "Enter the company's Name";
    if (!formData.location) newErrors.location = "WFH or a metro politican city?";
    if (!formData.jobType) newErrors.jobType = "what kind of job is it?";
    // if (!formData.salary || isNaN(formData.salary) || formData.salary < 1) newErrors.salary = "Enter how much salary are you willing to pay";
    if (!formData.deadline) newErrors.deadline = "Again what's the last day";
    if (!formData.description) newErrors.description = "Let us know more about your vehicles or preferences!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(()=>{
    setFormData((prev) => ({...prev,image:imageArr[randomIndex]}));
  },[])

  return (

    <div className="fixed inset-0 z-50 bg-black/60 flex p-4 md:p-6 flex-col gap-3 items-center justify-center">
      <div className="w-full flex flex-col md:flex-row max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white rounded-[20px] overflow-hidden shadow-2xl mx-auto">
        <div className="w-full h-full py-6 px-4 sm:px-8 md:p-10 relative overflow-y-auto flex flex-col items-center rounded-lg">
          {/*
          <button
            className="hidden md:block absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
          >
            ×
          </button>
          */}
          <h1 className='text-2xl font-bold mb-4'>Create Job Opening</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 w-full mx-5 lg:mx-0 flex-col gap-6 xl:pt-6 text-black">
            <label>
              Job Title
              <input
                name="jobTitle"
                placeholder='Enter the title'
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 rounded-lg"
              />
              {errors.jobTitle && <span className="text-red-400 text-sm">{errors.jobTitle}</span>}
            </label>
            <label>
              Company Name
              <input
                name="companyName"
                placeholder="Enter your Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
              />
              {errors.companyName && <span className="text-red-400 text-sm">{errors.companyName}</span>}
            </label>
            {/* Email */}
            <label>
              Location
              <input
                name="location"
                placeholder='Choose the location'
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
              />
              {errors.location && <span className="text-red-400 text-sm">{errors.location}</span>}
            </label>
            {/* Location */}
            <label>
              Job Type
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-gray-900 p-2.5 mt-1 focus:outline-none rounded-lg"
              >
                <option value="" className="text-[#686868]">Job type</option>
                <option value="Internship" className="text-black">Internship</option>
                <option value="Full Time" className="text-black">Full Time</option>
                <option value="Part Time" className="text-black">Part Time</option>
                <option value="Contract" className="text-black">Contract</option>
              </select>

              {errors.jobType && <span className="text-red-400 text-sm">{errors.jobType}</span>}
            </label>
            {/* Cars Count */}
            <label>
              Salary Range
              <div className='flex flex-col md:flex-row gap-4'> 
                <fieldset className='relative'>
                  <Image
                    src='/money.svg'
                    alt ='$'
                    width={14}
                    height={14}
                    className='absolute top-3.5 left-3'
                  />
                  <input
                    name="salary"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="      ₹0"
                    value={formData.salary.min === 0 ? "" : formData.salary.min}
                    onChange={(e)=>setFormData(prev =>({...prev,salary:{...prev.salary , min :e.target.value}}))}
                    className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
                  />
                </fieldset>
                <fieldset className='relative'>
                  <Image
                    src='/money.svg'
                    alt ='$'
                    width={14}
                    height={14}
                    className='absolute top-3.5 left-3'
                  />
                  <input
                    name="salary"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="      ₹50,000"
                    value={formData.salary.max === 0 ? "" : formData.salary.max}
                    onChange={(e)=>setFormData(prev =>({...prev,salary:{...prev.salary , max :e.target.value}}))}
                    className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
                  />
                </fieldset>
              </div>
              {errors.salary && <span className="text-red-400 text-sm">{errors.salary}</span>}
            </label>
            <label className='relative'>
              Application Deadline
              <Flatpickr
                name="deadline"
                options={{
                  dateFormat: "D , j M ",
                  plugins: [confirmDatePlugin({ showAlways: true, theme: "material_blue" })],
                }}
                value={formData.deadline}
                onChange={([date]) => setFormData({ ...formData, deadline: date })}
                className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
              />
              <Image
                src='/cal.svg'
                alt ='.'
                width={14}
                height={14}
                className='absolute top-10 right-3'
              />

              {errors.deadline && <span className="text-red-400 text-sm">{errors.deadline}</span>}
            </label>

            {/* Message */}
            <label className='col-span-2'>
              Job Description
              <textarea
                name="description"
                rows={4}
                placeholder="Please share a description to let the candidate know more about the job role"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-gray-900 p-2 mt-1 focus:outline-none rounded-lg"
              />
              {errors.description && <span className="text-red-400 text-sm">{errors.description}</span>}
            </label>
            <div className='col-span-2 flex justify-between'>

              <button type='button' className='relative min-w-36 min-h-12 px-4 py-2 xl:px-6 border border-black rounded-lg'>
                Save Draft
                <Image
                  src={'/draft.svg'}
                  alt='v'
                  width={8}
                  height={10}
                  className='absolute top-4.5 right-5'
                />
              </button>

              <button
                type="submit"
                disabled={loading}
                className={
                  ` relative min-w-36 min-h-12 w-fit flex justify-center items-center gap-2 px-4 py-2 xl:px-6 rounded-lg font-semibold transition-all bg-[#00AAFF] text-white
${loading ? 'cursor-not-allowed' : 'cursor-pointer'} `}
              >
                Publish
                <Image
                  src={'/pub.svg'}
                  alt='v'
                  width={10}
                  height={8}
                  className='absolute top-5 right-7'
                />
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
