import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
//urls
import {api} from "../../assets/URLS";

// Assets
import {
  boxes,
  calender,
  help,
  logout,
  pie,
  settings,
  user,
  users,
  cofeeSVG,
  activity,
  arrowDown,
  barchart,
  dbSVG,
  markSVG,
} from "../../assets/images/SVG";

function SideNav({clearUser, is_staff }) {
  const history = useHistory();

  const LogoutFunctionality = () => {
    // clear token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    history.push("/staff/login");

    const refresh_token = localStorage.getItem("refresh_token");
    // get users access token
    axios
      .post(api.refresh, {refresh: refresh_token})
      .then((token) => {
        const Config = {headers: { Authorization: "Bearer " + token.data.access }};
        const Body = { refresh: JSON.stringify(refresh_token) };
        // logout and clear refresh token and user fro local storage
        axios
          .post(api.logout, Body, Config)
          .then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("refresh_token");
            clearUser();
            history.push("/staff/login");
          });
      });
  };

  return (
    <div className="sideNav">
      <div className="basics">
        <NavLink to="/staff/dashboard" exact activeClassName="active-link">{boxes} Dashboard</NavLink>
        <NavLink to="/staff/active-guests" exact activeClassName="active-link">{users} Guests</NavLink>
        <NavLink to="/staff/book" exact activeClassName="active-link">{calender} Book</NavLink>
        <NavLink to="/staff/booking" exact activeClassName="active-link">{activity} Bookings</NavLink>
        <NavLink to="/staff/booking-request" exact activeClassName="active-link">{arrowDown} Booking Request</NavLink>
        <NavLink to="/staff/restaurent" exact activeClassName="active-link">{cofeeSVG} Restaurent</NavLink>
        <NavLink to="/staff/foodorders" exact activeClassName="active-link">{dbSVG} Food Orders</NavLink>
        <NavLink to="/staff/admin/food" exact activeClassName="active-link">{pie} Food Management</NavLink>
        <NavLink to="/staff/park-ticket" exact activeClassName="active-link">{markSVG} Park Ticket</NavLink>
        {is_staff ? (
          <>
            <NavLink to="/staff/admin/staff" exact activeClassName="active-link" > {user} Staff Management </NavLink>
            <NavLink to="/staff/admin/statics" exact activeClassName="active-link" > {barchart} Statistics </NavLink>
          </>
        ) : null}
      </div>
      <div className="additional">
        <Link to="/staff/login" onClick={LogoutFunctionality}> {logout} Logout</Link>
        <NavLink to="/staff/settings" exact activeClassName="active-link"> {settings} Settings</NavLink>
        {/* <NavLink to="/" exact activeClassName="active-link"> {help} Help</NavLink> */}
      </div>
    </div>
  );
}

export default SideNav;
