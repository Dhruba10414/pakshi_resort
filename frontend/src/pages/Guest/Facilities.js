import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// images
import garden1 from "../../assets/images/View/garden-1.jpg";
import garden2 from "../../assets/images/View/garden-2.jpg";
import garden3 from "../../assets/images/View/garden-3.jpg";
import garden5 from "../../assets/images/View/garden-5.jpg";
import garden6 from "../../assets/images/View/garden-6.jpg";
import garden7 from "../../assets/images/View/garden-7.jpg";
import pool1 from "../../assets/images/View/pool-3.jpg";
import indoor from "../../assets/images/View/indoor.jpg";
import honeymoon1 from "../../assets/images/View/honeymoon-1.jpg";
import honeymoon2 from "../../assets/images/View/honeymoon-2.jpg";
import splash from "../../assets/images/View/svg/splash.svg";
import landscape from "../../assets/images/View/svg/landscape.svg";
import honeymoon from "../../assets/images/View/svg/honeymoon.svg";
import indoorGames from "../../assets/images/View/svg/ball-pool.svg";
import park from "../../assets/images/View/svg/park.svg";

function Facilities() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="facilities">
        {/* heading */}
        <div className="facilities__heading">
          <h1>
            Take a look inside the Pakshi resort. A charming, sniptious place, a
            home from home. A great place to spend leisure memorable time with
            your family and friends.
          </h1>
        </div>
        {/* garden */}
        <div className="facilities__garden">
          <div className="first-step">
            <div className="garden-image">
              {/* <img className="img-on" src={garden2} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={garden2}
                className="img-on"
              />
            </div>
            <div className="garden-desc">
              <img className="landscape" src={landscape} alt="" />
              <h3>Our tidy up</h3>
              <h2>Garden & Playground</h2>
              <p>
                Here you will find beautiful, secluded and well-arranged gardens
                and spacious playgrounds with fresh air. If you want, you can
                sit in the garden and chat with your family or friends. Or you
                can walk in the middle of the field where you will find some
                deer cubs. It’s a wonderful combination and the only real
                decision you have to make is whether to enjoy it all in the
                saddle or on your own two feet.
              </p>
              {/* <img className="img-tw" src={garden1} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={garden1}
                className="img-tw"
              />
            </div>
          </div>
          {/* <img className="img-th" src={garden3} alt="" /> */}
          <LazyLoadImage
            alt={""}
            effect="blur"
            src={garden3}
            className="img-th"
          />
        </div>

        {/* swiming pool */}
        <div className="facilities__swimming">
          <div className="pool-container">
            <div className="pool-desc">
              <img className="splash" src={splash} alt="" />
              <h3>Our outdoor</h3>
              <h2>Swiming pools</h2>
              <p>
                Open to guests and members alike, our Swim area features outdoor
                pools for laps and splashing. A beautiful Rectangle and a small
                circle shaped pool is perfect for all.
              </p>
            </div>
            <div className="pool-image">
              {/* <img src={pool1} alt="" /> */}
              <LazyLoadImage alt={""} effect="blur" src={pool1} />
            </div>
          </div>
        </div>

        {/* honey moon */}
        <div className="facilities__honeymoon">
          <div className="honeymoon-container">
            <div className="honeymoon-desc">
              <img className="honeymoon" src={honeymoon} alt="" />
              <h3>Karni Kunjo</h3>
              <h2>Honeymoon Suit</h2>
              <p>
                We know that, there’s no such thing as a beutiful as honeymoon.
                Pakshi resort gives you a quite and Enthralling space with a
                Bower that have Luxury Comfortable room with drawing, dining
                trace kitchen, king Size bed. You can spend your meorable time
                with your sweetest partner in our Karni kunjo.
              </p>
              {/* <img className="img-tw" src={honeymoon2} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={honeymoon2}
                className="img-tw"
              />
            </div>
            <div className="honeymoon-image">
              {/* <img className="img-on" src={honeymoon1} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={honeymoon1}
                className="img-on"
              />
            </div>
          </div>
        </div>

        {/* Indoor Games */}
        <div className="facilities__games">
          <div className="games-container">
            <div className="games-desc">
              <img className="honeymoon" src={indoorGames} alt="" />
              <h3>Our Indoor</h3>
              <h2>Gaming Corner</h2>
              <p>
                You might like to play indoor games. But it is not possible to
                play sports in the busyness of work. While staying at the
                resort, you can go to our indoor gaming corner and play pool for
                a while.
              </p>
            </div>
            <div className="pool-image">
              {/* <img src={indoor} alt="" /> */}
              <LazyLoadImage alt={""} effect="blur" src={indoor} />
            </div>
          </div>
        </div>

        {/* garden seatinh */}
        <div className="facilities__garden">
          <div className="first-step">
            <div className="garden-image">
              {/* <img className="img-on" src={garden5} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={garden5}
                className="img-on"
              />
            </div>
            <div className="garden-desc">
              <img className="park" src={park} alt="" />
              <h3>Comfortable</h3>
              <h2>Garden Seating</h2>
              <p>
                Here you will find beautiful, secluded and well-arranged gardens
                and spacious playgrounds with fresh air. If you want, you can
                sit in the garden and chat with your family or friends. Or you
                can walk in the middle of the field where you will find some
                deer cubs. It’s a wonderful combination and the only real
                decision you have to make is whether to enjoy it all in the
                saddle or on your own two feet.
              </p>
              {/* <img className="img-tw" src={garden6} alt="" /> */}
              <LazyLoadImage
                alt={""}
                effect="blur"
                src={garden6}
                className="img-tw"
              />
            </div>
          </div>
          {/* <img className="img-th" src={garden7} alt="" /> */}
          <LazyLoadImage
            alt={""}
            effect="blur"
            src={garden7}
            className="img-th"
          />
        </div>
      </div>

      <Footer />
      <Navigation />
    </>
  );
}

export default Facilities;
