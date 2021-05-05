import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "../pages/pageComponents/NavbarElements";
import logo from "../images/logo.png";

const Menu = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/who-we-are" activeStyle>
            Our History
          </NavLink>
          <NavLink to="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          <NavLink to="/sign-in" activeStyle>
            Sign In
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Menu;
