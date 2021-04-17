import React from "react";
import { checked, warning } from "../../assets/images/SVG";

// NUMBER WITH COMMA
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// BILL AMOUNT FUNC
function BillAmounts({ bills, title }) {

  return (
    <div className="bill">
      <div className="recieved">
        <h3>TOTAL RECIEVED</h3>
        <h2>
          <span>৳</span> { bills.total_paid }
        </h2>
        { bills.due === 0
          ? <p className="com">{checked} Completed</p>
          : <p className="due">{warning} Due</p>
        }
      </div>

      <div className="details">
        {/* room */}
        <div className="detail room">
          <div className="label">
            <div className="circle"></div>
            <h3>{title} Bill</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>
            {numberWithCommas(bills.total_bills)}
          </h3>
        </div>
        {/* food */}
        <div className="detail food">
          <div className="label">
            <div className="circle"></div>
            <h3>Due Bill</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>{numberWithCommas(bills.due)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default BillAmounts;
