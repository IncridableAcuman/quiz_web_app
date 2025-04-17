import React from 'react'

const MainNavbar = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-6 bg-opacity-90 bg-gray-900 text-white">
        <h1 className='text-3xl font-bold tracking-tight bg-clip-text
        text-transparent bg-gradient-to-r from-indigo-700 via-pink-700 to-red-800 cursor-pointer'>Quiz<span>Web</span></h1>
        <button className='bg-gradient-to-br from-indigo-700 via-pink-700 to-red-800 text-white
        px-5 py-2.5 rounded-full shadow-lg cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:via-indigo-600
        hover:to-slate-950 transition duration-300'>Logout</button>
    </div>
    </>
  )
}

export default MainNavbar