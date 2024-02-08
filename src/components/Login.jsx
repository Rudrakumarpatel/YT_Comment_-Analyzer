import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

export const Login = ()=>{
    return  <>
  <section className="section">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
         {/* Email - text */}
          <div className="form-outline mb-4">
            <input type="email" id="Email" className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form1Example13">Email address</label>
          </div>

        {/* Password Input */}
          <div className="form-outline mb-4">
            <input type="password" id="Password" className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form1Example23">Password</label>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
            {/* Checkbox - input */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 ">OR</p>
          </div>
        <div className="signbutton">
        <a className="btn btn-Light btn-md btn-block Auth" style={{background: "white",border:"1.5px solid black"}} href="#!"
            role="button">
            <i className="fab fa-twitter me-2"><FcGoogle/></i>Continue with Google</a>
            
          <a className="btn btn-primary btn-md btn-block" style={{background: "#3b5998"}} href="#!"
            role="button">
            <i className="fab fa-facebook-f me-2"><ImFacebook2/></i>Continue with Facebook
          </a>
        </div>
        </form>
      </div>
    </div>
  </div>
</section>
</>
};