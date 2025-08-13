'use client'
import Image from 'next/image'
import { AppShell , Button } from '@mantine/core';


export default function Header(){

  return(
    <AppShell.Header withBorder={false} style={{ display: "flex", justifyContent: "center", alignItems: "center" , padding:'40px 0px',fontWeight: '600' }}>
      <Image
        src='./logo.svg'
        alt='logo'
        width = {44}
        height = {44} 
      />

      <nav className="flex px-14 gap-14">
        <a href='#'>Home</a>
        <a href='#'>Find Jobs</a>
        <a href='#'>Find Talents</a>
        <a href='#'>About us</a>
        <a href='#'>Testimonials</a>
      </nav>

      <Button 
        variant='gradient' 
        radius='50' 
        gradient={{ from: "#A128FF", to: "#6100AD", deg: 180 }}
        style ={{fontSize :'16px'}}
      >
        Create Jobs
      </Button>
    </AppShell.Header>
  )
}
