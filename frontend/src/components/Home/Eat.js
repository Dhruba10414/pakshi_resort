import React from "react";
import { Link } from "react-router-dom";

import view7 from "../../assets/images/resort/view7.JPG";
import view8 from "../../assets/images/resort/view8.JPG";
import view9 from "../../assets/images/resort/view9.JPG";

function Eat() {
  return (
    <>
      <div className="heading-block">
        <p className="secondary-head">Best dining experience</p>
        <h2 className="primary-head">Eat & Drinks</h2>
        <p className="desc-head">
          Beside daily foods our restaurant and juice bars provide the perfect
          backdrop for special family celebrations, post-round drinks, romantic
          dinners and sneaky nightcaps.
        </p>
        <Link to="/eat-drink">Explore more</Link>
      </div>

      <div className="eat-images">
        <div className="img1">
          <img src={view8} alt="" />
        </div>
        <div className="img2">
          <img className="i-1" src={view9} alt="" />
          <img className="i-2" src={view7} alt="" />
        </div>
      </div>
    </>
  );
}

export default Eat;
