import React from "react";
import { Link } from 'react-router-dom';

//assets
import logo from "../assets/images/Logo/logo-white.png";
import { facebookLogo, instagramLogo, twitterLogo, upC } from '../assets/images/SVG';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__top">
        <h1>Visit us and explore our area</h1>
      </div>
      <div className="footer__bottom">
        <div className="content">
          <div className="content__logo">
            <img src={logo} alt="" />
          </div>
          <div className="content__desc">
            <h3>Pakshi Resort LTD</h3>
            <p>
              Khankashorif Road, Paksey, Ishwardi Z6006 Pabna, Rajshahi
              Division, Bangladesh
            </p>
            <Link to="/">{facebookLogo}</Link>
            <Link to="/">{instagramLogo}</Link>
            <Link to="/">{twitterLogo}</Link>
          </div>
          <div className="content__menu">
              <Link to="/">Contact us</Link>
              <Link to="/">News & Accolades</Link>
              <Link to="/">Privace policy</Link>
              <Link to="/">Sitemap</Link>
              <Link to="/">FAQ</Link>
          </div>
          <div className="content__contact">
              <h3>Reservation</h3>
              <p>+880 1730706252</p>
              <p>+8801 730706252</p>
          </div>
          <div className="content__up">
              <div>
                  {upC}
              </div>
          </div>
        </div>
        <div className="copyright"></div>
      </div>
    </div>
  );
}

export default Footer;