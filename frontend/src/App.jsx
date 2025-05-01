// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Create from './pages/Create';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<Create />} />
      {/* <Route path="/projects" element={<Projects />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} /> */}
    </Routes>
    </>
  )
}

export default App
