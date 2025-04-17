import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MainNavbar from '../../components/navbar/MainNavbar'
import { Outdent } from 'lucide-react'

const MainLayout = () => {
  return (
    <>
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <MainNavbar/>
        <main className='p-4'>
          <Outdent/>
        </main>
      </div>
    </div>
    </>
  )
}

export default MainLayout