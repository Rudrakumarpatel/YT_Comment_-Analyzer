import React, { useEffect } from "react";
import { Searchbar } from "./Searchbar";
import { Footer } from "./Footer";
import "../App.css";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const BodyArea = () => {
  const history = useNavigate();
  const { user, loginWithRedirect,isAuthenticated} = useAuth0();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/Login");
    }
  });
  return (
    <>
      <div className="Bodyarea">
        <div className="welcome-text">
          <h1>Welcome to CommentSense</h1>
        </div>
        <div className="searchbar">
          <Searchbar></Searchbar>
        </div>
      </div>

        <Footer></Footer>
    </>
  );
};
