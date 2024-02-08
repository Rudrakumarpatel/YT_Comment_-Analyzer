import React from "react";
import { Searchbar } from "./Searchbar";
import { Footer } from "./Footer";

export const BodyArea = () => {
  return (
    <><div className="Bodyarea">
      <div className="searchbar">
        <Searchbar></Searchbar>
      </div>
    </div><Footer></Footer></>
  );
};
