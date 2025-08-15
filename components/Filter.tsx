'use client'

import Image from 'next/image'
import { useState , useEffect } from 'react';
import { Slider } from "@/components/ui/slider"
import useSWR from 'swr'
import getJobs from '@/utils/getJobs'
import Card from './Card.tsx'
import { useJobs } from "@/context/JobContext";

export default function Filter()  {
  const { jobs, mutateJobs } = useJobs();

  const [formData , setFormData] = useState({
    title:'',
    location :'',
    jobType :'',
    salary :{min:0,max:100000}
  })
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleChange = (e) =>{
    setFormData((prev)=>({...prev , [e.target.name] : e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData)

  }

  useEffect(()=>{
    console.log(formData)
    // if(!jobs) return
    let temp = [...jobs]

    if(formData.title){
      temp = temp.filter((job)=>
        job.jobTitle.toLowerCase().includes(formData.title.toLowerCase())
      )
    }

    if(formData.location){
      temp = temp.filter((job)=>
        job.location.toLowerCase().includes(formData.location.toLowerCase())
      )
    }

    if(formData.jobType){
      temp = temp.filter((job)=>
        job.jobType === formData.jobType
      )
    }

    if (formData.salary?.min !== undefined && formData.salary?.max !== undefined) {
      temp = temp.filter((job) => {
        return (
          job.salary.min >= Number(formData.salary.min) &&
            job.salary.max <= Number(formData.salary.max)
        );
      });
    }
    setFilteredJobs(temp);
  },[formData, jobs])

  return (
    <section className='max-w-[1440px] mx-auto'>
      <form onSubmit={handleSubmit} className='w-full flex justify-evenly items-center h-24 gap-8 focus:border-none'>
        <label className='flex gap-6'>
          <Image 
            src='/search.svg'
            alt='o'
            width={18}
            height={18}
          />
          <input
            name = 'title'
            type ='text'
            placeholder='Search By Job Title, Role'
            value = {formData.title}
            onChange = {handleChange}
            className='placeholder-[#686868] border-none focus:border-none focus:outline-none focus:ring-0'
          />
        </label>

        <label className='relative flex gap-6 drop '>
          <Image 
            src='/location.svg'
            alt='o'
            width={18}
            height={18}
          />
          <input
            name="location"
            type="text"
            placeholder="Preferred Location"
            value={formData.location}
            onChange={handleChange}
            list="location-list" // connects to datalist
            className="placeholder-[#686868] min-w-48 border-none focus:border-none focus:outline-none focus:ring-0"
          />

          <span className="absolute top-0 right-0 h-full w-8 bg-white pointer-events-none"></span>

          <Image
            src='/dropdown.svg'
            alt='v'
            width={18}
            height={18}
            className='absolute top-1 right-5 pointer-events-none'
          />
          <datalist id="location-list">
            <option value="Chennai" />
            <option value="Bangalore" />
            <option value="Hyderabad" />
            <option value="Mumbai" />
          </datalist>        
        </label>


        <label className='relative  flex gap-6 drop '>
          <Image 
            src='/jobtype.svg'
            alt='o'
            width={18}
            height={18}
          />

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="placeholder-[#686868] min-w-48 appearance-none text-black border-none focus:border-none focus:outline-none focus:ring-0"
          >
            <option value="" className="text-[#686868]">Job type</option>
            <option value="Internship" className="text-black">Internship</option>
            <option value="Full Time" className="text-black">Full Time</option>
            <option value="Part Time" className="text-black">Part Time</option>
            <option value="Contract" className="text-black">Contract</option>
          </select>

          <Image
            src='/dropdown.svg'
            alt='v'
            width={18}
            height={18}
            className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2'
          />
        </label>
        <label className='flex flex-col gap-4'>
          <div className='flex justify-between font-bold'>
            <h3>Salary Per Month</h3>
            <p>₹{formData.salary.min}k - ₹{formData.salary.max}k </p>
          </div>
          <Slider
            value={[formData.salary.min, formData.salary.max]}
            min={0}
            max={1000000}
            step={10000}
            onValueChange={([min, max]) => {
              setFormData((prev) => ({
                ...prev,
                salary: { min, max }
              }));
            }}
            className="w-2xs"
          />
        </label>
      </form>

      <div className='grid grid-cols-4 gap-8 p-8'>
        {filteredJobs?.map((job,i)=> <Card key={job._id || i} data={job}/>)}
      </div>
    </section>
  )
}
