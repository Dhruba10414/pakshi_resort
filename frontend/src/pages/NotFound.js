import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation/Navigation";
import logo from "../assets/images/Logo/logo-black.png"
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="notfound">
          <img src={logo} alt="" />
        <h1>Page not found</h1>
        <p>
          This could be because of a typo, an out of date link, or that the page
          you requested doesn't exist.
        </p>
        <Link to="/">Home Page</Link>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default NotFound;
