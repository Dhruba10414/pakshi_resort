import React from 'react'
import { Link } from "react-router-dom";

import view7 from "../../assets/images/resort/view7.JPG";
import view8 from "../../assets/images/resort/view8.JPG";
import view9 from "../../assets/images/resort/view9.JPG";

function Eat() {
    return (
        <>
            <div className="heading-block">
        <p className="secondary-head">Stay with us</p>
        <h2 className="primary-head">Eat & Drinks</h2>
        <p className="desc-head">
          From our cosiest to our grandest, we’ve got 26 beautiful bedrooms in 3
          main categories for the perfect night’s sleep.
        </p>
        <Link to="/">Explore more</Link>
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
    )
}

export default Eat
