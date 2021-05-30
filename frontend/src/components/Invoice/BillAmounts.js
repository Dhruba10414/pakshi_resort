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
          : <p className="due">{warning} Due {numberWithCommas(bills.due)}</p>
        }
      </div>

      <div className="details">
        {/* bill */}
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
        {/* vat */}
        <div className="detail food">
          <div className="label">
            <div className="circle"></div>
            <h3>Vat</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>
            {numberWithCommas(bills.total_vat)}
          </h3>
        </div>
        {/* due */}
        <div className="detail total">
          <div className="label">
            <div className="circle"></div>
            <h3>Total Bill</h3>
          </div>
          <h3 className="tk">
            <span>৳</span>{numberWithCommas(bills.net_payable)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default BillAmounts;
