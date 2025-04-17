import { Book, BookA, Code2, Contact, FileQuestion, Info, TestTube } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  const menuData=[
    {title:"About",icon:<Info/>,path:"#"},
    {title:"Students",icon:<Book/>,path:"#"},
    {title:"Teacher",icon:<BookA/>,path:"#"},
    {title:"Quizz Tests",icon:<TestTube/>,path:"#"},
    {title:"Questions",icon:<FileQuestion/>,path:"#"},
    {title:"Contact",icon:<Contact/>,path:"#"}
  ]
  return (
    <>
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <div className='mt-20 flex items-center justify-between p-4'>
        <h1 className='text-2xl font-bold tracking-tight bg-clip-text text-transparent
        bg-gradient-to-r from-indigo-700 via-pink-700 to-red-800'>Menu</h1>
        <Code2 className=' text-gray-300 cursor-pointer hover:text-white transition'/>
      </div>
      {menuData.map((item,index)=>(
        <div className="mt-4" key={index}>
          <a href={item.path} className='flex items-center gap-3 hover:bg-gray-800 px-4 py-2 hover:text-white transition rounded-lg'>
            {item.icon}
            {item.title}
          </a>
        </div>
      ))}
    </div>
    </>
  )
}

export default Sidebar