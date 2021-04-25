import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import congrats from "../../assets/images/View/svg/congrats.svg";

function Confirmed({ setState }) {
  
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="congrats">
      <img src={congrats} alt="" />
      <p>
        We have received your request. We will contact you as soon as possible
        to inform you about the progress of your booking request
      </p>
      <Link to="/booking" onClick={() => setState(0)}>
        Make another request
      </Link>
    </div>
  );
}

export default Confirmed;
