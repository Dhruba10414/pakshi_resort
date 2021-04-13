import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
import { useHistory } from "react-router-dom";
import { checkedIn, lock } from "../../assets/images/SVG";

function Entry({
  bookingId,
  room,
  guest,
  check_in,
  check_out,
  book_on,
  is_active,
  clearUser,
  notify,
}) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //////////////////////////////////////////////////
  // ================= (CHECK IN) =================
  const checkedInFunc = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const CHECK_IN_URL = `http://127.0.0.1:8000/bookings/checkin/`;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const Body = { "booking": bookingId };

        axios.post(CHECK_IN_URL, Body, Config)
        .then(() => {
          notify();
          setLoading(false);
          setChecked(true);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
        console.log(Body)
      })
      .catch((err) => {
        setLoading(false);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  };

  //////////////////////////////////////////////////
  // ================= (CHECK OUT) =================
  const checkedOutFunc = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = `http://127.0.0.1:8000/api/token/refresh/`;
    const CHECK_OUT_URL = `http://127.0.0.1:8000/bookings/checkout/`;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        const Body = { "booking": bookingId };

        axios
          .post(CHECK_OUT_URL, Body, Config)
          .then(() => {
            notify();
            setLoading(false);
            setChecked(true);
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  };

  useEffect(() => {}, [checked]);

  return (
    <div className="entry">
      <div className="no"># {room}</div>
      <div className="guest-name">{guest}</div>
      <div
        className={
          checked
            ? "status active"
            : is_active
            ? "status active"
            : "status pending"
        }
      >
        <p>{checked ? "staying" : is_active ? "staying" : "pending"}</p>
      </div>
      <div className="bookon">{book_on}</div>
      <div className="checkin">{check_in}</div>
      <div className="checkout">{check_out}</div>
      <div className="func">
        {
          checked || is_active 
          ? ( <button className="checkout" onClick={() => checkedOutFunc(bookingId)}> {checkedIn} Check-Out</button>)
          : !loading
            ? (<button className="checkin" onClick={() => checkedInFunc(bookingId)}>{checkedIn} Check-in</button>)
            : (<button className="disabled">{checkedIn} Loading.. </button>)
        }
      </div>
    </div>
  );
}

// Redux actions
const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(Entry);
