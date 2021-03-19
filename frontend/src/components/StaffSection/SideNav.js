import axios from "axios";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { boxes, calender, cloud, help, logout, pie, settings, user, users } from '../../assets/images/SVG';

function SideNav({role, clearUser}) {

  const LogoutFunctionality = () => {
    const refresh_token = localStorage.getItem('refresh_token');
    //get access token
    axios.post("http://127.0.0.1:8000/api/token/refresh/", { "refresh": refresh_token })
    .then(token => {
      const Config = {
        headers: { Authorization: "Bearer " + token.data.access },
        body: { refresh: refresh_token }
      }
      axios.post("http://127.0.0.1:8000/api/logout/", Config)
      .then(res => {
        console.log(res.message);
      })
      .catch(err => {
        console.log("error: " + err.message);
      })
    })


  //   const yourConfig = { headers: { Authorization: "Bearer " + token } }
  //   axios.post("http://127.0.0.1:8000/api/logout/", yourConfig)
  //   .then(() => {
  //     console.log("Success");
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   })
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
