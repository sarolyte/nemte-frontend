import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import "normalize.css";
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';



function App() {

  return (
    <>
      <Header/>      
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
      <Footer shortTxt='© 2025 Nemte. All right reserved' />
    </>
  )
}

export default App
