import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Images
import restaurent from "../../assets/images/Restaurent/restaurent-4.jpg";
import pool from "../../assets/images/Banner/resort2.jpg";
import garden from "../../assets/images/View/garden-2.jpg";
import playground from "../../assets/images/View/play-ground.jpg"

const imageArray = [restaurent, pool, garden, playground];

function Features() {
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(0);

  const imageHandler = (value) => {
    setTimeout(() => {
      setFront(value);
      setBack(front);
    }, 300);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".image .image-2", 1, {
      x: "-100%",
      ease: "power4",
    });
  }, [front]);

  return (
    <>
      <div className="image">
        <div className="odiv"></div>
        {/* <img className="image-1" src={imageArray[back]} alt="" /> */}
        {/* <img className="image-2" src={imageArray[front]} alt="" /> */}
        <LazyLoadImage alt={""} effect="blur" src={imageArray[back]} className="image-1" />
        <LazyLoadImage alt={""} effect="blur" src={imageArray[front]} className="image-2" />
      </div>
      <div className="content">
        <p className="content-desc">We have these</p>
        <h2>FACILITIES</h2>
        <div className="feature-list">
          <div className="feature">
            <p onClick={() => imageHandler(0)}>Restaurant and Juice Bar</p>
          </div>
          <div className="feature">
            <p onClick={() => imageHandler(1)}>Swimming Pool</p>
          </div>
          <div className="feature">
            <p onClick={() => imageHandler(2)}>Garden & Walk way</p>
          </div>
          <div className="feature">
            <p onClick={() => imageHandler(3)}>Play Ground</p>
          </div>
        </div>
        <Link to="/facilities">View More</Link>
      </div>
    </>
  );
}

export default Features;
