import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from "../pages/pageComponents/NavbarElements";

const Menu = () => {
  // const activeStyle = {
  //   color: "green",
  //   fontSize: "2rem",
  // };

  // return (
  //   <div>
  //     <ul>
  //       <li>
  //         <NavLink exact to="/" activeStyle={activeStyle}>
  //           Home
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink exact to="/about" activeStyle={activeStyle}>
  //           About
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/about/foo" activeStyle={activeStyle}>
  //           About Foo
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/posts" activeStyle={activeStyle}>
  //           Posts
  //         </NavLink>
  //       </li>
  //     </ul>
  //     <hr />
  //   </div>
  // );
  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about" activeStyle={activeStyle}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/about/foo" activeStyle={activeStyle}>
            About Foo
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts" activeStyle={activeStyle}>
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/testing" activeStyle={activeStyle}>
            Test Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" activeStyle={activeStyle}>
            Sign up
          </NavLink>
        </li>

        <NavLink to="/who-we-are" activeStyle>
          Who We Are
        </NavLink>
        <NavLink to="/contact-us" activeStyle>
          Contact Us
        </NavLink>
        <NavLink to="/sign-in" activeStyle>
          Sign In
        </NavLink>
      </ul>
      <hr />
    </div>
  );
};

export default Menu;
