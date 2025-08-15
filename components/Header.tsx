'use client'
import Image from 'next/image'
import { useState } from 'react'
import Popup from '@/components/Popup'

export default function Header(){
  const [showPopup,setShowPopup] = useState(false)
  return(
    <header className='flex justify-between md:justify-center items-center py-10 font-semibold px-2'>
      <Image
        src='./logo.svg'
        alt='logo'
        width = {44}
        height = {44} 
      />

      <nav className="hidden lg:flex px-14 gap-14">
        <a href='#'>Home</a>
        <a href='#'>Find Jobs</a>
        <a href='#'>Find Talents</a>
        <a href='#'>About us</a>
        <a href='#'>Testimonials</a>
      </nav>

      <button
        onClick={()=>setShowPopup(true)}
        className='text-white bg-gradient-to-r from-[#A128FF] to-[#6100AD] rounded-full px-4 p-2'
      >
        Create Jobs
      </button>
      {showPopup && <Popup onClose={()=>setShowPopup(false)}/>}
    </header>
  )
}
