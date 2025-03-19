import Signup from '@/components/auth/Signup';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Nark | Sign Up",
  description: "Fully protected login page",
};

const Page = () => {

  return (
    <div className='w-full'>
    <Signup/>
  </div>
  )
}

export default Page