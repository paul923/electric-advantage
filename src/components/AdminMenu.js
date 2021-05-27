import React from "react";
import { NavLink, Route } from "react-router-dom";

const adminMenu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  const SubMenu = () => {
    return (
      <ul>
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
          <NavLink exact to="/registerdealership" activeStyle={activeStyle}>
            Register Dealership
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <hr />
      <SubMenu />
      <hr />
    </div>
  );
};

export default adminMenu;
