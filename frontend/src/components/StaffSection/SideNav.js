import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";

// Assets
import { boxes, calender, cloud, help, logout, pie, settings, user, users } from '../../assets/images/SVG';

function SideNav({role, clearUser}) {
  const history = useHistory();
  
  const LogoutFunctionality = () => {
    const refresh_token = localStorage.getItem('refresh_token');
    // get users access token
    axios.post("http://127.0.0.1:8000/api/token/refresh/", { "refresh": refresh_token })
    .then(token => {
      const Config = { headers: { Authorization: "Bearer " + token.data.access } };
      const Body = {"refresh": JSON.stringify(refresh_token)};
      // logout and clear refresh token and user fro local storage
      axios.post("http://127.0.0.1:8000/api/logout/", Body, Config)
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('refresh_token');
        clearUser();
        history.push("/staff/login");
      })
    })
  }

  return (
    <div className="sideNav">
      <div className="basics">
        <NavLink to="/staff/dashboard" exact activeClassName="active-link"> {boxes} Dashboard
        </NavLink>
        <NavLink to="/staff/book" exact activeClassName="active-link"> {calender} Book </NavLink>
        <NavLink to="/staff/guests" exact activeClassName="active-link"> {users} Guests </NavLink>
        <NavLink to="/staff/foodorders" exact activeClassName="active-link"> {pie} Food Orders </NavLink>
        <NavLink to="/staff/park" exact activeClassName="active-link"> {cloud} Park Visitors </NavLink>
        {
          role === 'A'
          ? (<NavLink to="/staff/admin" exact activeClassName="active-link"> {user} Staff Management </NavLink>)
          : null
        }
        
      </div>
      <div className="additional">
        <Link onClick={LogoutFunctionality}> {logout} Logout </Link>
        <NavLink to="/" exact activeClassName="active-link"> {settings} Settings </NavLink>
        <NavLink to="/" exact activeClassName="active-link"> {help} Help </NavLink>
      </div>
    </div>
  );
}

export default SideNav;
