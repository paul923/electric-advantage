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
          <NavLink exact to="/cars" activeStyle={activeStyle}>
            Cars
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/dealers" activeStyle={activeStyle}>
            Dealers/Subscriptions
          </NavLink>
        </li>
      </ul>
      <button>Log out</button>
      <hr />
    </div>
  );
};

export default adminMenu;
