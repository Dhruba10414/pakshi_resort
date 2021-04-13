import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";

function Sitemaps() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="sitemaps">
        <div className="sitemaps__heading">
          <h3>Sitemaps</h3>
          <h2>Pakshi Resort LTD</h2>

          <ul className="sitemaps__links">
              <li><Link to="/">Pakshi Resort LTD</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/eat-drink">Eat & Drinks</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/privacy-policy">Privacy & Policies</Link></li>
          </ul>
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Sitemaps;
