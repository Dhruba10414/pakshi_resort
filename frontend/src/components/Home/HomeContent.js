import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// Components
import Footer from "../Footer";
import Eat from "./Eat";
import Features from "./Features";
import Heading from "./Heading";
import Park from "./Park";
import Rooms from "./Rooms";
import Meeting from "./Events";
import Navigation from "../Navigation/Navigation";
// Animation
import { HomeAnim } from "../../animations/HomeAnim";
// Images
import resort1 from "../../assets/images/Banner/resort1.jpeg";
import resort2 from "../../assets/images/Banner/resort2.jpg";
import resort3 from "../../assets/images/Banner/resort3.jpg";

function HomeContent() {
  const [imageArray, setImageArray] = useState([resort3, resort1, resort2]);

  useEffect(() => {
    HomeAnim();
    setImageArray([ resort3, resort1, resort2]);
  }, []);

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    speed: 1000,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    customPaging: (i) => {return (
        <div className="custom-dots">
          <img src={imageArray[i]} />
        </div>
      );},
  };

  return (
    <>
      <div className="home">
        <div className="home__container">
          {/* ------------ HEADING SECTION ------------- */}
          <div className="home-heading">
            <Heading />
          </div>
          <div className="home-image">
            <Slider {...settings} className="slider">
              { imageArray.map((image, index) => (<img key={index} src={image} alt="" />)) }
            </Slider>
          </div>
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
          <div className="features"><Features /></div>
        </div>

        <div className="home__rooms"><Rooms /></div>
        <div className="home__park"><Park /></div>
        <div className="home__eat"><Eat /></div>
        <div className="home__events"><Meeting /></div>

      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default HomeContent;

