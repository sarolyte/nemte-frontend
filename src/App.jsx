import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import "normalize.css";
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './pages/About/About.jsx';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails.jsx';



function App() {

  return (
    <>
      <Header/>      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/add-recipe" element={<CreateRecipe />}/>
        <Route path='/recipe/:id' element={<RecipeDetails/>} /> 
      </Routes>
      <Footer shortTxt='© 2025 Nemte. All right reserved' />
    </>
  )
}

export default App
