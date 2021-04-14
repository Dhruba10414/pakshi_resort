import React, { useEffect, useState } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Luxury from "../../components/Rooms/Luxury";
import Delux from "../../components/Rooms/Delux";
import Honeymoon from "../../components/Rooms/Honeymoon";
import Footer from "../../components/Footer";

function Rooms() {
    const [l, setL] = useState(true);
    const [d, setD] = useState(false);
    const [h, setH] = useState(false);

    const setToDState = () => { setD(true); setL(false); setH(false); }
    const setToLState = () => { setL(true); setD(false); setH(false); }
    const setToHState = () => { setH(true); setD(false); setL(false); }

    useEffect(() => {
      window.scrollTo(0,0);
    }, [])

  return (
    <>
      <div className="roooms">
        <div className="roooms__heading">
          <h1>
            We have divided our rooms into three main categories keeping in mind your budget where you can find
            not only a shelter but also a great relaxation.
          </h1>
        </div>
        <div className="roooms__nav">
            <div onClick={setToLState} className={l ? "active" : ""}>Luxury</div>
            <div onClick={setToDState} className={d ? "active" : ""}>Delux</div>
            <div onClick={setToHState} className={h ? "active" : ""}>Honeymoon</div>
        </div>

        <div className="roooms__container">
          { l && <Luxury /> }
          { d && <Delux /> }
          { h && <Honeymoon /> }
        </div>
      </div>
      <Footer />
      <Navigation />
    </>
  );
}

export default Rooms;
