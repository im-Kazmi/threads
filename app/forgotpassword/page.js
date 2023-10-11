'use client'
import Modal from '@/components/Modal'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex bg-base-300'>
        <div className='m-auto'>    
        <Modal />
        <button className="btn" onClick={() => window.modaledit.showModal()}>
        open modal
        </button>
        </div>
    </div>
  )
}

export default page