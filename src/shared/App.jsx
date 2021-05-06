import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  PostsPage,
  TestingPage,
  Signup,
  Login,
  ForgotPassword,
  UpdateProfile,
  Inventory,
  AccountInfo,
  Subscription,
  Cars,
  Dealers,
} from "../UserPages";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PrivateRoute from "../components/PrivateRoute";
import DealerMenu from "../components/DealersMenu";
import AdminMenu from "../components/AdminMenu";

export default class App extends Component {
  render() {
    // Temporarily changes render with "dealer", "admin".
    // Plannign to use authorized account types to change render in the future.
    const userType = "dealer";
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
        {/* CurrentUser.UserType == TYPE.ADMIN*/}
        <ProtectedRoute path="/testing" component={TestingPage} auth={true} />
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
