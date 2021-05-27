import React, {
  useState
} from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "../pages/pageComponents/NavbarElements";
import logo from "../images/ELECTRIC-ADVANTAGE-logo.png";
import { useAuth } from "./AuthContext";


export default function Menu() {
  const { currentUser, userType, logout, dealerObjectId } = useAuth();


  const makeMenu = () => {
    return (
      <div>
        <Nav>
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
          <Bars />
          <NavMenu>
            {userType === "DEALERSHIP" && dealerObjectId === null ? (
              <NavLink to="/dealerprofile"  activeStyle>
                Dealership
              </NavLink>
            ): userType === "ADMIN" ? (
              <NavLink to="/admin" activeStyle>
                Admin
              </NavLink>
            ) : userType === "DEALERSHIP" && dealerObjectId !== null ? (
              <NavLink to="/dealer" activeStyle>
                Dealership
              </NavLink>
            ) : null}
            <NavLink to="/api-test" activeStyle>
              API Testing
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
            {currentUser ? (
              <NavLink to="/login" onClick={() => logout()} activeStyle>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login" activeStyle>
                Sign In
              </NavLink>
            )}
          </NavMenu>
        </Nav>
      </div>
    );
  };

  return <div>{makeMenu()}</div>;
};

