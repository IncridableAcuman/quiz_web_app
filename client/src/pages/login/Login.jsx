import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Lock, Mail, Send, User } from 'lucide-react'

const Login = () => {
  return (
    <>
      <Navbar/>
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-950 to-indigo-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-28 px-[10%]">
        <img src="./a.jpg" alt="a" className='rounded-3xl shadow-lg' />
        <div className="w-full max-w-md bg-white mx-auto text-gray-900 rounded-3xl shadow-lg p-5">
        <h1 className='text-center text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r
        from-indigo-600 via-pink-500 to-red-600 mt-2'>Sign In</h1>
          <form className='space-y-6'>
            <p className=' text-right pr-5 mt-5'>Don`t have an account? <span className='text-md font-semibold text-pink-500 
            cursor-pointer hover:underline'>Sign In</span></p>
            <div className="mt-5">
              <div className="flex items-center justify-between px-7 py-5">
                <button className='flex items-center gap-5 border border-gray-500 px-7 py-2.5 cursor-pointer hover:bg-gray-100 transition duration-100'>
                  <img src="https://google.com/favicon.ico" alt="google" className='w-5 h-5 mr-2' />
                  Google
                </button>
                <p className='text-gray-400'>OR</p>
                <button className='flex items-center gap-5 border border-gray-500 px-7 py-2.5
                cursor-pointer hover:bg-gray-100 transition duration-300'>
                  <img src="https://github.com/favicon.ico" alt="github" className='w-5 h-5' />
                  Github</button>
              </div>
              <form className='space-y-4 w-full'>
                <div className="flex items-center gap-3 w-[90%] bg-gray-100 mx-auto px-5 py-2.5 rounded-full border-2">
                  <User/>
                  <input type="text" placeholder='Username' className='w-full outline-none' />
                </div>
                <div className="flex items-center gap-3 w-[90%] bg-gray-100 mx-auto px-5 py-2.5 rounded-full border-2">
                  <Mail/>
                  <input type="email" placeholder='Email' className='w-full outline-none' />
                </div>
                <div className="flex items-center gap-3 w-[90%] bg-gray-100 mx-auto px-5 py-2.5 rounded-full border-2">
                  <Lock/>
                  <input type="password" placeholder='Password' className='w-full outline-none' />
                </div>
                <p className='ml-8 text-gray-500 cursor-pointer hover:underline hover:text-gray-600'>Forgot Password</p>
                <button className='flex items-center  cursor-pointer gap-3 mx-auto bg-gradient-to-br from-indigo-500 via-pink-500
                to-red-500 text-white w-[90%] rounded-full px-4 py-2 text-center'>
                  <Send/>
                  <p>Submit</p>
                </button>
              </form>
            </div>
          </form>
      </div>
      </div>

    </div>
    </>
  )
}

export default Login