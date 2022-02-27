import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Landing from './components/Landing';
import Home from './components/Home';
import CreateDogs from './components/CreateDogs';
import Details from './components/Details';
import NavFilter from './components/NavFilter';
import Footer from './components/Footer';

import style from "./App.css";

function App() {
  return (
    <div className={style.swal2}>
      <Routes>
        <Route path="/home" element={<Header/>} />
        <Route path="/dogs" element={<Header/>} />
        <Route path="/dogs/:id" element={<Header/>} />
      </Routes>

      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home" element={<NavFilter/>} />
        <Route path="/dogs" element={<CreateDogs/>} />
        <Route path="/dogs/:id" element={<Details/>} />
      </Routes>

      <Routes>
        <Route path="/home" element={<Footer/>} />
        <Route path="/dogs" element={<Footer/>} />
        <Route path="/dogs/:id" element={<Footer/>} />
      </Routes>
    </div>
  );
};

export default App;
