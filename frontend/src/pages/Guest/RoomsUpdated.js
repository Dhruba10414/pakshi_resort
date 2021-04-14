import React, { useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer";

// Images
import dcouple from "../../assets/images/Room/delux-couple/dc.jpg";
import ddouble from "../../assets/images/Room/delux-double/dd2.jpg";
import dtween from "../../assets/images/Room/delux-twin/delux-twin-1.jpg";
import dtripple from "../../assets/images/Room/delux-twin/delux-twin-2.jpg";
import { Link } from "react-router-dom";

function RoomsUpdated() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
      <div className="roooms">
        <div className="roooms__heading">
          <h1>
            We have divided our rooms into diffrent categories keeping in mind
            your budget where you can find not only a shelter but also a great
            relaxation.
          </h1>
        </div>

        <div className="roooms__rooms">
          {/* room - luxury room */}
          {/* <div className="room">
            <div className="room__image">
              <img src={dcouple} alt="" />
            </div>
            <div className="room__info">
              <h2>Luxury Room</h2>
              <p>
                Luxury Comfortable room with King Size bed,with Sofa, luxury bed
                linens & towels, special bathroom amenities...
              </p>
              <Link to="/">view room</Link>
            </div>
          </div> */}
          {/* room - delux couple */}
          <div className="room">
            <div className="room__image">
              <img src={dcouple} alt="" />
            </div>
            <div className="room__info">
              <h2>Deluxe Couple Bed</h2>
              <p>
                Take a relax with a queen size couple bed in our Delux couple
                Room, where you will find full comfort.
              </p>
              <Link to="/room/delux-couple">view room</Link>
            </div>
          </div>
          {/* room - delux double */}
          <div className="room">
            <div className="room__image">
              <img src={ddouble} alt="" />
            </div>
            <div className="room__info">
              <h2>Deluxe Double Bed</h2>
              <p>
                A dedicated area with permanent semi-permanent setups with
                natural beauty around, with shared toilet...
              </p>
              <Link to="/room/delux-double">view room</Link>
            </div>
          </div>
          {/* room - delux twin */}
          <div className="room">
            <div className="room__image">
              <img src={dtween} alt="" />
            </div>
            <div className="room__info">
              <h2>Deluxe Twin Bed</h2>
              <p>
                Comfortable room with two Single Size bed, luxury bed linens &
                towels, bathroom amenities and slippers..
              </p>
              <Link to="/room/delux-twin">view room</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default RoomsUpdated;
