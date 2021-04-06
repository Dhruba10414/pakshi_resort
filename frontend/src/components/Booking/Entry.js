import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
import { useHistory } from "react-router-dom";
import { checkedIn } from "../../assets/images/SVG";

function Entry({
  bookingId,
  room,
  guest,
  check_in,
  check_out,
  book_on,
  is_complete,
  is_canceled,
  clearUser,
  notify
}) {

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  // UPDATE CURRENT CONDITION OF BOOKED ROOM.
  const checkedInFunc = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const CHECK_IN_URL = `http://127.0.0.1:8000/bookings/checkin/`;

    axios.post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
    .then((token) => {
      const Config = { headers: { Authorization: "Bearer " + token.data.access }};
      const Body = {"booking": bookingId};

      axios.post(CHECK_IN_URL, Body, Config)
      .then(() => {notify(); setLoading(false);})
      .catch(err => {console.log(err.message); setLoading(false);})
    })
    .catch((err) => {
      setLoading(false);
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      clearUser();
      history.push("/staff/login");
    })
  }

  return (
    <div className="entry">
      <div className="no"># {room}</div>
      <div className="guest-name">{guest}</div>
      <div
        className={
          is_canceled
            ? "status canceled"
            : is_complete
            ? "status completed"
            : "status pending"
        }
      >
        <p>
          {is_canceled ? "Canceled" : is_complete ? "Completed" : "Pending"}
        </p>
      </div>
      <div className="bookon">{book_on}</div>
      <div className="checkin">{check_in}</div>
      <div className="checkout">{check_out}</div>
      <div className="func">
        {!is_canceled ? (
          !is_complete ?
            !loading
            ? <button onClick={() => checkedInFunc(bookingId)}>{checkedIn} Check-in </button>
            : <button className="disabled" >{checkedIn} Loading.. </button>
          : 
          <button className="disabled" >{checkedIn} Checked </button>
        ) : (
          "----"
        )}
      </div>
    </div>
  );
}

// Redux actions
const mapDispatchToProps = (dispatch) => {
  return { clearUser: () => { dispatch(clearUser())} };
};

export default connect(null, mapDispatchToProps)(Entry);
