import React from "react";
import tr1 from "../../assets/images/View/triangle/t-1.png";
import tr2 from "../../assets/images/View/triangle/t-2.png";
import tr3 from "../../assets/images/View/triangle/t-3.png";

function FreeSpace({setAddFood}) {
  return (
    <div className="freeSpace">
      {/* HEADING */}
      <div className="heading">
        <h3>Manage</h3>
        <p>foods</p>
      </div>
      <img src={tr1} className="img-1" alt="" />
      <img src={tr1} className="img-2" alt="" />
      <img src={tr1} className="img-3" alt="" />
      <img src={tr2} className="img-4" alt="" />
      <img src={tr3} className="img-5" alt="" />

      <div className="text-box">
        <p>
          To edit food name, update price of a food or change availablity please
          select a food item from menu.
        </p>
        <p>
          If you want to add a food item click the button below.
        </p>
        <button onClick={() => setAddFood(true)}>Add Food</button>
      </div>
    </div>
  );
}

export default FreeSpace;
