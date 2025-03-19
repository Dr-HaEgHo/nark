import React from 'react'

const Loading = () => {
  return (
    <div className='fixed bg-blackTrans w-full h-screen flex items-center'>
      <p className='text[40px] text-background text-center font-semibold'>Loading, <br /> <span className='font-normal text-xl'>please wait...</span></p>
    </div>
  )
}

export default Loading