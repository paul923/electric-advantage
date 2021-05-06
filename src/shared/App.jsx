import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, WhoWeAre, ContactUs, SignIn, SearchResult } from "../pages";
import Menu from "../components/Menu";
import {
  AboutPage,
  ForgotPassword,
  HomePage,
  PostsPage,
  TestingPage,
  Signup,
  Login,
  UpdateProfile,
} from "../pages";
import AccountInfo from "../pages/dealerPages/AccountInfo";
import Inventory from "../pages/dealerPages/Inventory";
import Subscription from "../pages/dealerPages/Subscription";
import Cars from "../pages/adminPages/Cars";
import Dealers from "../pages/adminPages/Dealers";
import ProtectedRoute from "../components/ProtectedRoute";
import PrivateRoute from "../components/PrivateRoute";
import DealerMenu from "../components/DealersMenu";
import AdminMenu from "../components/AdminMenu";

export default class App extends Component {
  render() {
    // Temporarily changes render with "dealer", "admin".
    // Plannign to use authorized account types to change render in the future.
    const userType = "s";
    return userType === "admin" ? (
      <div>
        <AdminMenu />
        <Route path="/cars" component={Cars} />
        <Route path="/dealers" component={Dealers} />
      </div>
    ) : userType === "dealer" ? (
      <div>
        <DealerMenu />
        <Route path="/accountinfo" component={AccountInfo} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/inventory" component={Inventory} />
      </div>
    ) : (
      <div>
        <Menu />
        <Route exact path="/" component={HomePage} />
        <Switch>
          <Route path="/about/:name" component={AboutPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
        <Route path="/posts" component={PostsPage} />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/who-we-are" component={WhoWeAre} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/search-result" component={SearchResult} />
        </Switch>
        {/* CurrentUser.UserType == TYPE.ADMIN*/}
        <ProtectedRoute path="/testing" component={TestingPage} auth={true} />
        <img src="../../images/background.png" alt="?" />
      </div>
    );
  }
}

// src/reducers/auth.js
// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   isLoading: false,
//   user: null
//   }
