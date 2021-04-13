import React from "react";
import { Link } from "react-router-dom";

import food from "../../assets/images/Restaurent/food-1.png";
import food2 from "../../assets/images/Restaurent/food-4.JPG";
import restaurant from "../../assets/images/Restaurent/restaurent-8.JPG";

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
          <img src={food} alt="" />
        </div>
        <div className="img2">
          <img className="i-1" src={restaurant} alt="" />
          <img className="i-2" src={food2} alt="" />
        </div>
      </div>
    </>
  );
}

export default Eat;
