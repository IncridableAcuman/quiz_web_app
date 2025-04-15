import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Login from './pages/login/Login'
import Student from './pages/student/Student'
import Teacher from './pages/teacher/Teacher'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/student' element={<Student/>} />
      <Route path='/teacher' element={<Teacher/>} />
    </Routes>
    </>
  )
}

export default App