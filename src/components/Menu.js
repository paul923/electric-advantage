import React, {
  useContext,
  useState,
  useEffect,
  componentDidMount,
  componentDidUpdate,
} from "react";
import { auth } from "../firebase";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "../pages/pageComponents/NavbarElements";
import logo from "../images/ELECTRIC-ADVANTAGE-logo.png";
import { useAuth } from "./AuthContext";
import { Button, TextField } from "@material-ui/core";

const Menu = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [userId, setUserId] = useState("");
  const { currentUser, userType, logout } = useAuth();

  async function signOut(e) {
    e.preventDefault();
    logout();
  }

  return (
    <Nav>
      <NavLink to="/">
        <img src={logo} alt="logo" className="logo" style={{ fill: "white" }} />
      </NavLink>
      <Bars />
      <NavMenu>
        {userType === "DEALERSHIP" ? (
          <NavLink to="/dealer" activeStyle>
            Dealership
          </NavLink>
        ) : userType === "ADMIN" ? (
          <NavLink to="/admin" activeStyle>
            Admin
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
          <Button onClick={() => logout()}>
            <h1>logout</h1>
          </Button>
        ) : (
          <NavLink to="/login" activeStyle>
            Sign In
          </NavLink>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Menu;
