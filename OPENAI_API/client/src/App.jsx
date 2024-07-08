import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Analyse from './components/Analyse';
import Results from './components/Results';
function App() {

  return(
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/analyse' element={<Analyse/>}/>
        <Route path='/result' element={<Results/>}/>
    </Routes>
    
    </>
  )
}

export default App;