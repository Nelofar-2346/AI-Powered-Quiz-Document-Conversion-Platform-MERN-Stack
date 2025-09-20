import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'

import Nav from './components/Nav'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    
     <Nav />
     <Routes>
      <Route path ='/' element ={<Home />} />
      
         <Route path ='/login' element ={<Login />} />
          <Route path ='/about' element ={<About />} />
           <Route path ='/contact' element ={<Contact />} />
            <Route path ='/Profile' element ={<Profile />} />
            
         </Routes>   
    </div>
  )
}

export default App