import Link from 'next/link'
import React from 'react'

const SideBarItem = ({item}) => {
  return (
    <Link href={item.link} className='w-[200px]  flex ml-2 px-3 pr-6 gap-3 py-3 hover:bg-primary hover:bg-opacity-30 cursor-pointer rounded-lg'>
        <span className=' my-auto'>{item.Icon}</span>
        <div className=''>
            <h1>{item.name}</h1>
        </div>
    </Link >
  )
}

export default SideBarItem