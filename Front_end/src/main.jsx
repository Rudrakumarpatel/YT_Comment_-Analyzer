import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Login } from './components/Login.jsx';
import { Navbar } from "./components/Navbar.jsx";
import { Searchbar } from "./components/Searchbar.jsx";
import { BodyArea } from "./components/bodyArea.jsx";
import { Login } from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <BodyArea /> },
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
