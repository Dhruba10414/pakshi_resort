import React from "react";

import resort from "../assets/images/resort.jpg";
import Features from "../components/Home/Features";
import Heading from "../components/Home/Heading";
import Rooms from "../components/Home/Rooms";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        {/* heaing section */}
        <div className="home-heading"> <Heading /> </div>
        {/* image section */}
        <div className="home-image" style={{ background: `url(${resort}) no-repeat center center / cover`,}}></div>
      </div>

      <div className="home__features">
        {/* short description section */}
        <p className="short-desc"> The <span>Pakshi Resort</span> is an exclusive, private and river view resort lush with tropical plants by the side of mighty river padma of Bangladesh</p>
        
        {/* feature section */}
        <div className="features--heading-for-mobile">
          <p>We provide you these</p>
          <h2>FEATURES</h2>
        </div>
        <div className="features"> <Features /> </div>
      </div>

      {/* <div className="home__rooms"> */}
        {/* <div className="rooms"> <Rooms /> </div> */}
      {/* </div> */}
    </div>
  );
}

export default Home;
