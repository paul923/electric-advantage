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
import logo from "../images/logo.png";
import { useAuth } from "./AuthContext";
import { Button, TextField } from "@material-ui/core";


const Menu = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [userId, setUserId] = useState("")
  const { currentUser, userType, logout, dealerObjectId } = useAuth()


  



  return  <Nav>
  <NavLink to="/">
    <img src={logo} alt="logo" className="logo" />
  </NavLink>
  <Bars />
  <NavMenu>
    
  { (userType === "DEALERSHIP" && dealerObjectId === null) ? (
      <NavLink to="/dealerprofile" activeStyle>
      Register dealership
    </NavLink> 

    )
   : userType === "ADMIN" ? (
      <NavLink to="/admin" activeStyle>
          Admin
      </NavLink>
    ) :   userType === "DEALERSHIP" ? (
      <NavLink to="/dealer" activeStyle>
        Dealership
      </NavLink>   ) : (
      null
    )}


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
    ) }
  </NavMenu>
  </Nav>

  }
    
    

export default Menu;