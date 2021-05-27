import React from "react";
import { NavLink } from "react-router-dom";

const adminMenu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/adminMake" activeStyle={activeStyle}>
            Make
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/adminModel" activeStyle={activeStyle}>
            Model
          </NavLink>
        </li>
         <li>
          <NavLink exact to="/adminVehicle" activeStyle={activeStyle}>
            Vehicles
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/adminDealer" activeStyle={activeStyle}>
            Dealers
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/adminSub" activeStyle={activeStyle}>
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/6" activeStyle={activeStyle}>
            Signup dealership
          </NavLink>
        </li>

      </ul>
     
      <hr />
    </div>
  );
};

export default adminMenu;
