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
  const { currentUser, userType, logout } = useAuth()

  async function signOut(e) {
      e.preventDefault()
      logout()
    }
  



  return  <Nav>
  <NavLink to="/">
    <img src={logo} alt="logo" className="logo" />
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
    ) : (
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
            <Button
            onClick={() => logout()}
          >
          Logout
          </Button>

    ) : (
      <NavLink to="/login" activeStyle>
      Sign In
      </NavLink>
    ) }


    
  </NavMenu>
  </Nav>
  userType === "DEALERSHIP" ? (
    <Nav>
    <NavLink to="/">
      <img src={logo} alt="logo" className="logo" />
    </NavLink>
    <Bars />
    <NavMenu>
      <NavLink to="/dealer" activeStyle>
        Dealership
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
          <NavLink to="/admin" activeStyle>
          Admin
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