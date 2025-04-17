import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Login from './pages/login/Login'
import Student from './pages/student/Student'
import Teacher from './pages/teacher/Teacher'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import ResetPassword from './pages/reset-password/ResetPassword'
import AdminPanel from './pages/admin/AdminPanel'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/student' element={<Student/>} />
      <Route path='/teacher' element={<Teacher/>} />
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App