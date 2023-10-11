import React, { useEffect } from 'react'
import SideBarItems from './SideBarItems'

const BigSidebar = ({children}) => {

  return (
    <div className='w-full min-h-screen fixed flex bg-base-200'>
        <div className='w-1/4 bg-white flex flex-col'>
            <SideBarItems />
        </div>
        <div className='w-full h-full flex m-5'>
            {children}
        </div>
    </div>
  )
}

export default BigSidebar