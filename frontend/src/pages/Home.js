import React from "react";

import resort from "../assets/images/resort.jpg";
import Footer from "../components/Footer";
import Eat from "../components/Home/Eat";
import Features from "../components/Home/Features";
import Heading from "../components/Home/Heading";
import Park from "../components/Home/Park";
import Rooms from "../components/Home/Rooms";
import Navigation from "../components/Navigation/Navigation";

function Home() {
  return (
    <>
      <div className="home">
        <div className="home__container">
          {/* ------------ HEADING SECTION ------------- */}
          <div className="home-heading">
            <Heading />
          </div>
          <div
            className="home-image"
            style={{
              background: `url(${resort}) no-repeat center center / cover`,
            }}
          ></div>
        </div>

        <div className="home__features">
          {/* ------------ SHORT DESCRIPTION SECTION ------------- */}
          <p className="short-desc">
            The <span>Pakshi Resort</span> is an exclusive, private and river
            view resort lush with tropical plants by the side of mighty river
            padma of Bangladesh
          </p>

          {/* ------------ FEATURES SECTION ------------- */}
          <div className="features--heading-for-mobile">
            <p>We provide you these</p>
            <h2>FEATURES</h2>
          </div>
          <div className="features">
            <Features />
          </div>
        </div>

        <div className="home__rooms">
          <Rooms />
        </div>

        <div className="home__park">
          <Park />
        </div>

        <div className="home__eat">
          <Eat />
        </div>
      </div>
      {/* <Footer /> */}
      <Navigation />
    </>
  );
}

export default Home;
