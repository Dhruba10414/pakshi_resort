import React, { useEffect, useState } from "react";
import { checked } from "../../assets/images/SVG";

function BillAmounts({ roomBills, foodBills }) {
  const [roomBill, setRoomBill] = useState("");
  const [foodBill, setFoodBill] = useState("");

  // NUMBER WITH COMMA
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // CALCULATION
  useEffect(() => {
    let roombillamount = 0;
    let foodbillamount = 0;
    roomBills.map((data) => roombillamount += data.bill);
    foodBills.map((data) => foodbillamount += data.total);
    setRoomBill(numberWithCommas(roombillamount));
    setFoodBill(numberWithCommas(foodbillamount));
  }, [roomBills]);

  return (
    <div className="bill">
      <div className="recieved">
        <h3>TOTAL RECIEVED</h3>
        <h2>
          <span>৳</span>15,000
        </h2>
        <p>{checked} Completed</p>
      </div>

      <div className="details">
        {/* room */}
        <div className="detail room">
          <div className="label">
            <div className="circle"></div>
            <h3>Room bill</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>
            {roomBill}
          </h3>
        </div>
        {/* food */}
        <div className="detail food">
          <div className="label">
            <div className="circle"></div>
            <h3>Food bill</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>{foodBill}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default BillAmounts;
