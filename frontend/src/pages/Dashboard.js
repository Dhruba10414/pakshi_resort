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
import RoomDetails from "../components/Dashboard/RoomDetails";
import Loading from "../components/Loading";
import { rsvg, searchSvg } from "../assets/images/SVG";

function Dashboard({ clearUser }) {
  /* ----------------- V A R I A B L E S ----------------------- */
  const [roomList, setRoomList] = useState([]);
  // const [desiredRoom, setDesiredRoom] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openRoomDetails, setOpenRoomDetails] = useState(false);
  const [details, setDetails] = useState({});
  const history = useHistory();

  /* ----------------- F U N C T I O N S ----------------------- */
  // OPEN DETAIL MODAL
  const openDetailsModal = ( id, name, check_in, check_out, room_no, room_type ) => {
    setOpenRoomDetails(true);
    setDetails({ id, name, check_in, check_out, room_no, room_type });
  };
  // CLOSE MODAL
  const closeModal = () => {
    setOpenRoomDetails(false);
  };

  useEffect(() => {
    setLoading(true);
    const refresh_token = localStorage.getItem("refresh_token");
    // get users access token
    axios
      .post(api.refresh, { refresh: refresh_token })
      .then((token) => {
        const Config = { headers: { Authorization: "Bearer " + token.data.access } };
        // get rooms
        axios
          .get(api.rooms, Config)
          .then((res) => { setRoomList(res.data); setLoading(false); })
          .catch((err) => { console.clear(); setError(err.message); });
      })
      .catch(() => {
        //auth error
        console.clear();
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
          {!openRoomDetails ? (
            <div className="room-table-container">
              <div className="room-table">
                {/* table heading */}
                <div className="table-heading">
                  <div className="no">Room {rsvg}</div>
                  <div className="cottage">Cottage{rsvg}</div>
                  <div className="status">Status {rsvg}</div>
                  <div className="guest-name">Guest Name{rsvg}</div>
                  <div className="checkin">Check In{rsvg}</div>
                  <div className="checkout">Check Out{rsvg}</div>
                </div>
                {/* table content */}
                <div className="roomEntries">
                  {!loading ? (
                    roomList.map((room) => (
                      <Room
                        key={room.room_num}
                        room_no={room.room_num}
                        room_type={room.room_type}
                        cottage_num={room.cottage_num}
                        status={room.is_occupied}
                        active_booking={room.active_booking}
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
          ) : (
            <RoomDetails
              id={details.id}
              name={details.name}
              room_no={details.room_no}
              room_type={details.room_type}
              checkIn={details.check_in}
              checkOut={details.check_out}
              closeModal={closeModal}
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
