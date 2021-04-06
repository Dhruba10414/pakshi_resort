import React from "react";
import { Link } from "react-router-dom";
import parkImage from "../../assets/images/resort/view-6.JPG";

function Park() {
  return (
    <>
    <div className="park-overlay"></div>
    <div className="park">
      <div className="heading">
        <h1>Relax and revive your mental health with our natural park.</h1>
      </div>
      <div className="desc">
        <p>
          Pakshi covers around 33 acres of land with natural views. It has
          lakes, playground, garden that can heal your stress.
        </p>
        <Link to="/">Learn more</Link>
      </div>
    </div>
    </>
  );
}

export default Park;
