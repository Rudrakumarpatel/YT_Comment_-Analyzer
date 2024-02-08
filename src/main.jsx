import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Login } from './components/Login.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Searchbar } from './components/Searchbar.jsx';
import { BodyArea } from './components/bodyArea.jsx';
import { Login } from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "/", element:<BodyArea/>},
      {path:"/Login",element:<Login/>}
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
