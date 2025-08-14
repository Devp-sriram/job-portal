'use client'
import Image from 'next/image'
import { useState , useEffect } from 'react';
import { Slider } from "@/components/ui/slider"

export default function Filter()  {

  const [formData , setFormData] = useState({
    title:'',
    location :'',
    jobType :'',
    salary :{min:0,max:50}
  })

  const handleChange = (e) =>{
    setFormData((prev)=>({...prev , [e.target.name] : e.target.value}))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData)

  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  return (
    <section className='max-w-[1440px] mx-auto'>
      <form onSubmit={handleSubmit} className='w-full flex justify-evenly items-center h-24 gap-8'>
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
            className='placeholder-[#686868] focus:border-b'
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
            // list="location-list" // connects to datalist
            className="placeholder-[#686868] focus:border-b"
          />

          <Image
            src='/dropdown.svg'
            alt='v'
            width={18}
            height={18}
            className='absolute top-1 right-5'
          />
          <datalist id="location-list">
            <option value="New York" />
            <option value="San Francisco" />
            <option value="London" />
            <option value="Bangalore" />
          </datalist>        
        </label>


        <label className='relative flex gap-6 drop '>
          <Image 
            src='/jobtype.svg'
            alt='o'
            width={18}
            height={18}
          />
          <input
            name="jobType"
            type="text"
            placeholder="Job type"
            value={formData.jobType}
            onChange={handleChange}
            // list="location-list" // connects to datalist
            className="placeholder-[#686868] focus:border-b"
          />

          <Image
            src='/dropdown.svg'
            alt='v'
            width={18}
            height={18}
            className='absolute top-1 right-5'
          />
          <datalist id="location-list">
            <option value="New York" />
            <option value="San Francisco" />
            <option value="London" />
            <option value="Bangalore" />
          </datalist>        
        </label>
        <label className='flex flex-col gap-4'>
          <div className='flex justify-between font-bold'>
            <h3>Salary Per Month</h3>
            <p>₹{formData.salary.min}k - ₹{formData.salary.max}k </p>
          </div>
        <Slider
          value={[formData.salary.min, formData.salary.max]}
          min={0}
          max={100}
          step={1}
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
    </section>
  )
}
