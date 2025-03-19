import Login from '@/components/auth/Login';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Nark | Login",
  description: "Fully protected login page",
};

const Page = () => {

  return (
    <div className='w-full'>
      <Login/>
    </div>
  )
}

export default Page