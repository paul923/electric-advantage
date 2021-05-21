import React, { useContext, useState, useEffect, componentDidMount, componentDidUpdate } from "react"
import { auth } from "../firebase"
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "../pages/pageComponents/NavbarElements";
import logo from "../images/logo.png";
import { useAuth, login } from "./AuthContext"
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";
import { render } from "@testing-library/react";






const Menu = () => {

  const [userType, setUserType] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const { currentUser } = useAuth()

  useEffect(() => {
    onLoadGetUserType(userType)
  });
  
  // componentDidMount(() => {
  //   onLoadGetUserType(userType)
  // }, []);

  // componentDidUpdate(() => {
  //   onLoadGetUserType(userType)
  // }, []);

 
  function onLoadGetUserType(searchUserId) {
    if (!searchUserId) {
      setSearchedUser("CUSTOMER")
    } 
    let resultUser = getUserByUserId(searchUserId);
    let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        setUserType(body.UserTypeID)
        console.log("userType is")
        console.log(body.UserTypeID)
        console.log(body.UserTypeID === "ab")
  }
}


    return userType === "DEALERSHIP" ? (
      <Nav>
      <NavLink to="/">
        <img src={logo} alt="logo" className="logo" />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/admin" activeStyle>
          DEALERSHIP
        </NavLink>
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
        <NavLink to="/login" activeStyle>
          Sign In
        </NavLink>
      </NavMenu>
      </Nav>
      ) : userType === "ADMIN" ? (
        <Nav>
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
          <Bars />
          <NavMenu>

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
            <NavLink to="/login" activeStyle>
              Sign In
            </NavLink>
          </NavMenu>
        </Nav>
      ) :  (
        <div>

        <Nav>
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <Bars />
        <NavMenu>

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
          <NavLink to="/login" activeStyle>
            Sign In
          </NavLink>
        </NavMenu>
      </Nav>
            </div>

      );
    }
      
      

export default Menu;
