import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <div className="mb-0 pb-0 Footer">
        <footer className="ps-4" style={{ width: "100%" }}>
          <div className="d-flex flex-column flex-sm-row justify-content-between border-top absolute-bottom ps-4 pt-2 mt-10">
            <p>© 2024 Comment Analyzer, Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};
