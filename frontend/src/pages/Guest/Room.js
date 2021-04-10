import React, { useEffect, useState } from "react";
import Slider from "react-slick";
//  Components
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation/Navigation";
// Images
import dcouple1 from "../../assets/images/Room/delux-couple/dc.jpg";
import dcouple2 from "../../assets/images/Room/delux-couple/dc2.png";
import dcouple3 from "../../assets/images/Room/delux-couple/dc3.jpg";
import ddouble1 from "../../assets/images/Room/delux-double/dd1.jpg";
import ddouble2 from "../../assets/images/Room/delux-double/dd2.jpg";
import ddouble3 from "../../assets/images/Room/delux-double/dd3.jpg";
import dtween1 from "../../assets/images/Room/delux-twin/delux-twin-1.jpg";
import dtween2 from "../../assets/images/Room/delux-twin/delux-twin-2.jpg";
import dtween3 from "../../assets/images/Room/delux-twin/delux-twin-3.jpg";
// Svgs
import guestSVG from "../../assets/images/View/svg/guest.svg";
import areaSVG from "../../assets/images/View/svg/select.svg";
import takaSVG from "../../assets/images/View/svg/taka.svg";
import cofeeSVG from "../../assets/images/View/svg/coffee-cup.svg";
import keySVG from "../../assets/images/View/svg/house-key.svg";
import poolSVG from "../../assets/images/View/svg/swimming.svg";
import matSVG from "../../assets/images/View/svg/prayer-rug.svg";
import wifiSVG from "../../assets/images/View/svg/wifi.svg";
import tvSVG from "../../assets/images/View/svg/television.svg";
import sofaSVG from "../../assets/images/View/svg/couch.svg";
import breakfastSVG from "../../assets/images/View/svg/breakfast.svg";
import lockerSVG from "../../assets/images/View/svg/locker.svg";
import { Link } from "react-router-dom";

function Room() {
  const [deluxCoupleImages, setDeluxCoupleImages] = useState([
    dcouple1,
    dcouple2,
    dcouple3,
  ]);
  const [deluxDoubleImages, setDeluxDoubleImages] = useState([
    ddouble1,
    ddouble2,
    ddouble3,
  ]);
  const [deluxTwinImages, setDeluxTwinImages] = useState([
    dtween1,
    dtween2,
    dtween3,
  ]);
  const [deco, setDeCo] = useState(false);
  const [dedo, setDeDo] = useState(false);
  const [detw, setDeTw] = useState(false);

  const settings = {
    dots: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 1000,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const path = window.location.pathname;
    if (path === "/room/delux-couple") {
      setDeCo(true);
      setDeDo(false);
      setDeTw(false);
    } else if (path === "/room/delux-double") {
      setDeCo(false);
      setDeDo(true);
      setDeTw(false);
    } else if (path === "/room/delux-twin") {
      setDeCo(false);
      setDeDo(false);
      setDeTw(true);
    }

    setDeluxCoupleImages([dcouple1, dcouple2, dcouple3]);
    setDeluxDoubleImages([ddouble1, ddouble2, ddouble3]);
    setDeluxTwinImages([dtween1, dtween2, dtween3]);
  }, [window.location.pathname]);

  return (
    <>
      <div className="dRooms">
        <div className="dRooms__heading">
          {deco && (
            <h1>
              Delux Couple Bed <Link to="/">Book Now</Link>{" "}
            </h1>
          )}
          {dedo && (
            <h1>
              Delux Double Bed <Link to="/">Book Now</Link>{" "}
            </h1>
          )}
          {detw && (
            <h1>
              Delux Twin Bed <Link to="/">Book Now</Link>{" "}
            </h1>
          )}

          <Slider {...settings} className="slider">
            {deco &&
              deluxCoupleImages.map((image, index) => (
                <img key={index} src={image} alt="" />
              ))}
            {dedo &&
              deluxDoubleImages.map((image, index) => (
                <img key={index} src={image} alt="" />
              ))}
            {detw &&
              deluxTwinImages.map((image, index) => (
                <img key={index} src={image} alt="" />
              ))}
          </Slider>
        </div>

        <div className="dRooms__short-descs">
          <div className="short-desc">
            <img src={guestSVG} alt="" /> <p>2 GUEST</p>
          </div>
          <div className="short-desc">
            <img src={areaSVG} alt="" /> <p>230 sqft</p>
          </div>
          <div className="short-desc">
            <img src={takaSVG} alt="" /> <p>5,000 Tk/PER NIGHT</p>
          </div>
        </div>

        <div className="dRooms__desc">
          {deco && (
            <p>
              A 230 square feet security safe air-conditioned room each with an
              attached bath and garden view. Here we 13 delux coupled bed
              rooms that are furnished with a queen size bed, a reading corner,
              closet space, multimedia facility. Couples or a family can enjoy a
              pleasant stay.
            </p>
          )}

          {dedo && (
            <p>
              A 230 square feet security safe air-conditioned room each with an
              attached bath. Here we have 13 delux double bed rooms that are
              furnished with a queen size bed, a reading corner, closet space,
              multimedia facility.
            </p>
          )}

          {detw && (
            <p>
              A 275 square feet security safe air-conditioned room each with an
              attached bath. Here we have 9 delux delux twin bed rooms that are
              furnished with twin single size bed, a reading corner, closet space,
              multimedia facility.
            </p>
          )}
        </div>

        <div className="dRooms__amenities">
          <h2>Amenities</h2>
          <div className="amenities">
            <div className="amenitie">
              <img src={keySVG} alt="" />
              <p>24/7 room service</p>
            </div>
            <div className="amenitie">
              <img src={cofeeSVG} alt="" />
              <p>Complementary tea/coffee</p>
            </div>
            <div className="amenitie">
              <img src={breakfastSVG} alt="" />
              <p>Complementary breakfast</p>
            </div>
            <div className="amenitie">
              <img src={poolSVG} alt="" />
              <p>Swimming Pool</p>
            </div>
            <div className="amenitie">
              <img src={matSVG} alt="" />
              <p>Prayer Rug</p>
            </div>
            <div className="amenitie">
              <img src={wifiSVG} alt="" />
              <p>Wifi</p>
            </div>
            <div className="amenitie">
              <img src={tvSVG} alt="" />
              <p>Television</p>
            </div>
            <div className="amenitie">
              <img src={sofaSVG} alt="" />
              <p>Sofa</p>
            </div>
            <div className="amenitie">
              <img src={lockerSVG} alt="" />
              <p>Personal reack</p>
            </div>
          </div>
        </div>

        <div className="dRooms__similar">
          <h2>Similar Rooms</h2>
          <div className="similarRooms">
            {!deco && (
              <div className="similarRooms__room">
                <img src={dcouple1} alt="" />
                <h3>
                  <Link to="/room/delux-couple">Delux Couple bed</Link>
                </h3>
                <p>
                  Take a relax with a queen size couple bed in our Delux couple
                  Room, where you will find full comfort...
                </p>
              </div>
            )}

            {!dedo && (
              <div className="similarRooms__room">
                <img src={ddouble1} alt="" />
                <h3>
                  <Link to="/room/delux-double">Delux double bed</Link>
                </h3>
                <p>
                  A dedicated area with permanent semi-permanent setups with
                  natural beauty around, with shared toilet...
                </p>
              </div>
            )}

            {!detw && (
              <div className="similarRooms__room">
                <img src={dtween2} alt="" />
                <h3>
                  <Link to="/room/delux-twin">Delux twin bed</Link>
                </h3>
                <p>
                  Comfortable room with two Single Size bed, luxury bed linens &
                  towels, bathroom amenities and slippers..
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Room;
