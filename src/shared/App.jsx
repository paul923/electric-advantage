import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  WhoWeAre,
  ContactUs,
  Profile,
  SearchResult,
  SearchDetail,
  Landing,
  PostsPage,
  ForgotPassword,
  Signup,
  TestingPage,
  AboutPage,
  Login,
} from "../pages";
import Menu from "../components/Menu";
import AccountInfo from "../pages/dealerPages/AccountInfo";
import Inventory from "../pages/dealerPages/Inventory";
import Subscription from "../pages/dealerPages/Subscription";

import ProtectedRoute from "../components/ProtectedRoute";
import PrivateRoute from "../components/PrivateRoute";
import DealerMenu from "../components/DealersMenu";
import AdminMenu from "../components/AdminMenu";
import Subscriptions from "../pages/adminPages/Subscriptions";
import Vehicles from "../pages/adminPages/Vehicles";
import Dealers from "../pages/adminPages/Dealers";

export default class App extends Component {
  render() {
    // Temporarily changes render with "dealer", "admin".
    // Plannign to use authorized account types to change render in the future.
    const userType = "admin";
    return userType === "admin" ? (
      <div>
        <AdminMenu />
        <Route path="/admin" component={AdminMenu} />
        <Route path="/1" component={Subscriptions} />
        <Route path="/2" component={Vehicles} />
        <Route path="/3" component={Dealers} />
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
        <Route exact path="/" component={Landing} />
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
          <Route path="/who-we-are" component={WhoWeAre} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/profile" component={Profile} />
          <Route path="/search-result" component={SearchResult} />
          <Route path="/search-detail" component={SearchDetail} />
        </Switch>

        <Route path="/api-test" component={TestingPage} />
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
