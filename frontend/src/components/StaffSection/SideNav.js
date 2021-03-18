import React from "react";
import { NavLink } from "react-router-dom";
import { boxes, calender, cloud, help, logout, pie, settings, user, users } from '../../assets/images/SVG';

function SideNav({role}) {
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
        <NavLink to="/" exact activeClassName="active-link"> {logout} Logout </NavLink>
        <NavLink to="/" exact activeClassName="active-link"> {settings} Settings </NavLink>
        <NavLink to="/" exact activeClassName="active-link"> {help} Help </NavLink>
      </div>
    </div>
  );
}

export default SideNav;
