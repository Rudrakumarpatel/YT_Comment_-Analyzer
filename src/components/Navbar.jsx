import React, { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
export const Navbar = () => {

 const [mode,setMode] =  useState("light");


 const setDarkMode = () =>{
    document.querySelector("body")?.setAttribute("data-theme-body","dark");
 }
 const setLightMode = () =>{
    document.querySelector("body")?.setAttribute("data-theme-body","light");
 }

 const toggleDarkMode = () =>{
  if(mode === "dark")
  {
    console.log("setting mode");
    setMode("white");
    setLightMode();
  }
  else
  {
    setMode("dark");
    setDarkMode();
  }

 }
  return (
    <>
      <header className="p-3 text-bg-white nav">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="name d-flex">
            <img src="#" alt="image"/>
            <p
              className="d-flex align-items-center mb-2 mb-lg-0 fw-bold fs-4 text-decoration-none web-name"
            >
            Comment Analyzer
            </p>
            </div>
            
            <div className="text-end button d-flex">
               <a href="/Login" className="btn btn-outline-dark me-2 Login">Login</a>
               
                <a href="/Signup" className="btn signup">Sign up</a>

              {/* <button data-gfg-action="toggleGFGTheme" aria-label="Toggle GFG Theme" style={{"cursor": "pointer", "padding": "8px", "border": "1px solid rgb(204, 204, 204)", "borderRadius": "4px", "background": "transparent", "margin-right": "5px"}} className="mode"></button> */}
              <p className="mode" onClick={toggleDarkMode}>{mode === "dark" ?<MdLightMode/> : <MdDarkMode/>}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
