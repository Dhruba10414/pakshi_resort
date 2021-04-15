import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../redux/user/userAction";
import axios from "axios";
// api
import { api } from "../assets/URLS";
// compoents
import ContentBox from "../components/StaffSection/ContentBox";
import Room from "../components/Dashboard/Room";
import FoodOrder from "../components/Dashboard/FoodOrder";
import RoomDetails from "../components/Dashboard/RoomDetails";
import Invoice from "../components/Dashboard/Invoice";
import Loading from "../components/Loading";
import { rsvg, searchSvg } from "../assets/images/SVG";

function Dashboard({ clearUser }) {
  /* ----------------- V A R I A B L E S ----------------------- */
  // for room list shoen in dashboard
  const [roomList, setRoomList] = useState([]);
  // for search a room
  const [room, setRoom] = useState("");
  const [desiredRoom, setDesiredRoom] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // foor food Order
  const [openOrder, setOpenOrder] = useState(false);
  const [orderFor, setOrderFor] = useState({});
  // for view room details
  const [openRoomDetails, setOpenRoomDetails] = useState(false);
  const [details, setDetails] = useState({});
  // for view invoice
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({});

  const history = useHistory();

  /* ----------------- F U N C T I O N S ----------------------- */
  // OPEN FOOD ORDER MODAL
  const openFoodOrderModal = (id, name, room_no) => {
    setOpenOrder(true);
    setOrderFor({ id: id, name: name, room_no: room_no });
  };
  // OPEN FOOD ORDER MODAL
  const openDetailsModal = (
    id,
    name,
    check_in,
    check_out,
    room_no,
    room_type
  ) => {
    setOpenRoomDetails(true);
    setDetails({ id, name, check_in, check_out, room_no, room_type });
  };
  // OPEN INVOICE MODAL
  const openInvoiceModal = (guestId, roomNo) => {
    setOpenInvoice(true);
    setInvoiceInfo({ guestId, roomNo });
  };
  // CLOSE MODAL
  const closeModal = () => {
    setOpenOrder(false);
    setOpenRoomDetails(false);
    setOpenInvoice(false);
  };
  // SEARCH A SPECIFIC ROOM
  const searchRoom = (event) => {
    event.preventDefault();
    const sroom = roomList.find((el) => el.room_num === parseInt(room));
    if (sroom) {
      setDesiredRoom(sroom);
    } else {
      setError("Room not found");
    }
  };

  useEffect(() => {
    setLoading(true);
    const refresh_token = localStorage.getItem("refresh_token");
    // get users access token
    axios
      .post(api.refresh, {
        refresh: refresh_token,
      })
      .then((token) => {
        const Config = {
          headers: { Authorization: "Bearer " + token.data.access },
        };
        // get rooms
        axios
          .get(api.rooms, Config)
          .then((res) => {
            setRoomList(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        //auth error
        setError(err.message);
        localStorage.removeItem("user");
        localStorage.removeItem("refresh_token");
        clearUser();
        history.push("/staff/login");
      });
  }, []);

  return (
    <ContentBox heading="Dashboard">
      <div className="dashboard">
        <div className="dashboard-container">
          {/* ============== ROOMS TABLE ============== */}
          {!openOrder && !openRoomDetails && !openInvoice ? (
            <div className="room-table-container">
              <div className="room-table">
                {/* search field */}
                <div className="search-field">
                  <form onSubmit={searchRoom}>
                    <div className="icon">{searchSvg}</div>
                    <input
                      type="text"
                      placeholder="Search by #room number"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </form>
                </div>
                {/* table heading */}
                <div className="table-heading">
                  <div className="no">Room {rsvg}</div>
                  <div className="status">Status {rsvg}</div>
                  <div className="guest-name">Guest Name{rsvg}</div>
                  <div className="checkin">Check In{rsvg}</div>
                  <div className="checkout">Check Out{rsvg}</div>
                  <div className="food-order">Order Food{rsvg}</div>
                </div>
                {/* table content */}
                <div className="roomEntries">
                  {!loading ? (
                    roomList.map((room) => (
                      <Room
                        key={room.room_num}
                        room_no={room.room_num}
                        room_type={room.room_type}
                        status={room.is_occupied}
                        active_booking={room.active_booking}
                        openFoodOrderModal={openFoodOrderModal}
                        openDetailsModal={openDetailsModal}
                      />
                    ))
                  ) : (
                    <Loading
                      height="80vh"
                      width="100%"
                      textSize="16px"
                      space="4px"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : openOrder ? (
            <FoodOrder
              guestId={orderFor.id}
              name={orderFor.name}
              room={orderFor.room_no}
              closeModal={closeModal}
            />
          ) : openInvoice ? (
            <Invoice />
          ) : (
            <RoomDetails
              id={details.id}
              name={details.name}
              room_no={details.room_no}
              room_type={details.room_type}
              checkIn={details.check_in}
              checkOut={details.check_out}
              closeModal={closeModal}
              openInvoiceModal={openInvoiceModal}
            />
          )}

          {/* RIGHT NAV */}
          {/* <div className="right-nav"></div> */}
        </div>
      </div>
    </ContentBox>
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

export default connect(null, mapDispatchToProps)(Dashboard);
