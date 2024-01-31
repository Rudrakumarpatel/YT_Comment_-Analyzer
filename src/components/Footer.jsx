import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="container mb-0 pb-0 Footer">
        <footer className="ps-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between border-top absolute-bottom">
            <p>© 2024 Comment Analyzer, Inc. All rights reserved.</p>
            {/* <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#twitter">t</use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#instagram">i</use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul> */}
          </div>
        </footer>
      </div>
    </>
  );
};
