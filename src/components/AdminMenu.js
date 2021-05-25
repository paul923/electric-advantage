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
          <NavLink exact to="/1" activeStyle={activeStyle}>
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/2" activeStyle={activeStyle}>
            Vehicles
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/3" activeStyle={activeStyle}>
            Dealers
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/4" activeStyle={activeStyle}>
            Register Make
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/5" activeStyle={activeStyle}>
            Register Model
          </NavLink>
        </li>
      </ul>
     
      <hr />
    </div>
  );
};

export default adminMenu;
