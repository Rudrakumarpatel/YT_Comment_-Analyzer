import React from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { BodyArea } from './components/bodyArea';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="d-flex flex-column justify-content-between vh-100 body">
      <Navbar></Navbar>
      <Outlet/>
    </div>
    </>
  )
}

export default App
