import React from "react";
import { Link } from "react-router-dom";

function Heading() {
  return (
    <>
      <h1>Pakshi</h1>
      <h3>Resort</h3>

      <h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-map-pin"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Pabna
      </h2>
      <p>
        We are open and ready to welcome you. Book your rooms today and feel
        stress-free with our flexible cancellation policy.
      </p>
      <Link to="/">Read more</Link>
    </>
  );
}

export default Heading;
