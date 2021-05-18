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
          <NavLink to="/api-test" activeStyle>
            API Testing
          </NavLink>
          <NavLink to="/landing" activeStyle>
            Landing
          </NavLink>
          <NavLink to="/who-we-are" activeStyle>
            Our History
          </NavLink>
          <NavLink to="/contact-us" activeStyle>
            Contact Us
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          <NavLink to="/login" activeStyle>
            Sign In
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Menu;
