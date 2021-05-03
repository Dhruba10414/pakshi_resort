import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
import resort1 from "../../assets/images/Banner/resort1.jpg";
import resort2 from "../../assets/images/Banner/resort2.jpg";
import resort3 from "../../assets/images/Banner/resort3.jpg";
import s1 from "../../assets/images/Banner/s1.jpg";
import s2 from "../../assets/images/Banner/s2.jpg";
import s3 from "../../assets/images/Banner/s3.jpg";
import s4 from "../../assets/images/Banner/s4.jpg";
import s5 from "../../assets/images/Banner/s5.jpg";

function HomeContent() {
  const [imageArray, setImageArray] = useState([s4, s5, s3, s1, s2]);

  useEffect(() => {
    HomeAnim();
    setImageArray([s4, s5, s3, s1, s2]);
  }, []);

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    speed: 1000,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    customPaging: (i) => {
      return (
        <div className="custom-dots">
          <img src={imageArray[i]} />
          {/* <LazyLoadImage alt={""} effect="blur" src={imageArray[i]} /> */}
        </div>
      );
    },
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
              {imageArray.map((image, index) => (
                // <img key={index} src={image} alt="" />
                <LazyLoadImage key={index} alt={""} effect="blur" src={image} />
              ))}
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
        <div className="home__events">
          <Meeting />
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default HomeContent;
