import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { clearUser } from "../../redux/user/userAction";
import { useHistory } from "react-router-dom";
import { checkedIn } from "../../assets/images/SVG";
//urls
import { api } from "../../assets/URLS";

function Entry({
  bookingId,
  room,
  guest,
  check_in,
  check_out,
  book_on,
  is_active,
  clearUser,
  notifyforCheckout,
  notifyForCancel,
  notifyForConfirm,
  notifyForError
}) {

  const [checkFoConfirm, setCheckForConfirm] = useState(false);
  const [checkFoCancel, setCheckForCancel] = useState(false);
  const [checkForCheckout, setCheckForCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const checkDateAndCheckIn = () => {
    const date = new Date();
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;
    
    if(today !== check_in){
      notifyForError();
    } else{
      checkedInFunc();
    }
  }

  //////////////////////////////////////////////////
  // ================= (CHECK IN) =================
  const checkedInFunc = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const CHECK_IN_URL = api.check_in;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access }};
        const Body = { "booking": bookingId };

        axios
          .post(CHECK_IN_URL, Body, Config)
          .then(() => {
            notifyForConfirm();
            setLoading(false);
            setCheckForConfirm(true);
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

  //////////////////////////////////////////////////
  // ================= (CHECK OUT) =================
  const checkedOutFunc = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const CHECK_OUT_URL = api.check_out;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        const Body = { booking: bookingId };

        axios
          .post(CHECK_OUT_URL, Body, Config)
          .then(() => {
            notifyforCheckout();
            setLoading(false);
            setCheckForConfirm(false);
            setCheckForCheckout(true);
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  };

  //////////////////////////////////////////////////
  // ================= (CANCEL BOOKING) =================
  const cancelBooking = () => {
    setLoading(true);

    const REFRESH_TOKEN = localStorage.getItem("refresh_token");
    const GET_ACCESS_TOKEN_URL = api.refresh;
    const CANCEL_URL = api.cancel_booking;

    axios
      .post(GET_ACCESS_TOKEN_URL, { refresh: REFRESH_TOKEN })
      .then((token) => {
        const Config = {headers: { Authorization: "Bearer " + token.data.access }};
        const Body = { booking: bookingId };
        
        axios
          .post(CANCEL_URL, Body, Config)
          .then(() => {
            notifyForCancel();
            setLoading(false);
            setCheckForCancel(true);
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  };

  useEffect(() => {}, [checkForCheckout, checkFoCancel, checkFoConfirm]);

  return (
    <div className="entry">
      <div className="no"># {room}</div>
      <div className="guest-name">{guest}</div>
      <div
        className={
          checkFoConfirm
            ? "status active"
            : checkFoCancel
              ? "status canceled"
              : is_active
              ? "status active"
              : "status pending"
        }
      >
        <p>
          {checkFoConfirm
            ? "staying"
            :  checkFoCancel
                ? "canceled"
                : checkForCheckout
                ? "leaved"
                : is_active
                  ? "staying"
                  : "pending"
            }
        </p>
      </div>
      <div className="bookon">{book_on}</div>
      <div className="checkin">{check_in}</div>
      <div className="checkout">{check_out}</div>
      <div className="func">
        {
          checkFoConfirm
          ? !loading
            ? <button className="checkout" onClick={checkedOutFunc}>{checkedIn} Check-Out</button>
            : <button className="disabled">{checkedIn} prcessing.. </button>
          : checkFoCancel || checkForCheckout
            ? "/"
            : is_active
              ? !loading 
                ? <button className="checkout" onClick={checkedOutFunc}>{checkedIn} Check-Out</button>
                : <button className="disabled">{checkedIn} prcessing.. </button>
              : !loading 
                ? ( <div className="btn-boxx">
                    <button className="checkin" onClick={checkDateAndCheckIn}>Check-in</button>
                    <button className="cancel" onClick={cancelBooking}>Cancel</button>
                  </div>
                )
                : <button className="disabled">{checkedIn} prcessing.. </button>
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
