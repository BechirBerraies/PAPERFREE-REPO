import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Process from './components/Process';
import CreateUser from './components/CreateUser';
function App() {

  return(
    <>
    <Routes>
        <Route path='/' element={<CreateUser/>}/>
        <Route path="/process" element={<Process/>} />
    </Routes>
    
    </>
  )
}

export default App;