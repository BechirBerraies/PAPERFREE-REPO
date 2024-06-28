import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Process from './components/Process';
import Home from './components/Home';
import Analyse from './components/Analyse';
function App() {

  return(
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/process" element={<Process/>} />
        <Route path='/test' element={<Analyse/>}/>
    </Routes>
    
    </>
  )
}

export default App;