import React from "react";
import { checkedIn } from "../../assets/images/SVG";

function Entry({ room, guest, check_in, check_out, book_on, is_complete, is_canceled }) {
  return (
    <div className="entry">
      <div className="no">{room}</div>
      <div className="guest-name">{guest}</div>
      <div className={is_canceled ? "status canceled" : is_complete ? "status completed" : "status pending"}>
          <p>{is_canceled ? "Canceled" : is_complete ? "Completed" : "Pending"}</p>
    </div>
      <div className="bookon">{book_on}</div>
      <div className="checkin">{check_in}</div>
      <div className="checkout">{check_out}</div>
      <div className="func">
          {
              !is_canceled 
              ? !is_complete
                ? (<button className="accept">
                    {checkedIn} Check-in
                  </button>)
                : "----"
            : "----"
          }
      </div>
    </div>
  );
}

export default Entry;
