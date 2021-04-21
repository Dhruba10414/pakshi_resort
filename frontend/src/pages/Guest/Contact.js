import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import drone from "../../assets/images/View/drone-2.jpg";
import { Link } from "react-router-dom";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="contact">
        <div className="contact-container">
          <div className="texts">
            <div className="texts__heading">
              <h3>Contact us</h3>
              <h2>Get in touch</h2>
              <p>
                Please call our hotline to contact us. We’re always happy to
                help.
              </p>
            </div>
            <div className="texts__address">
              <h3>Pakshi resort LTD</h3>
              <p>Khankashorif Road, Paksey,</p>
              <p>Ishwardi Z6006 Pabna</p>
            </div>
            <div className="texts__phone">
              <h3>For Reservations please call:</h3>
              <p>F:880 1730706252</p>
              <p>F:880 1730706257</p>
            </div>
          </div>
          <div className="image">
            {/* <img src={drone} alt="" /> */}
            <LazyLoadImage alt={""} effect="blur" src={drone} />
          </div>
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Contact;
