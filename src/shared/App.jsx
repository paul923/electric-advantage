import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, AboutPage, PostsPage, TestingPage } from "../pages";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";

export default class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Route exact path="/" component={HomePage} />
        <Switch>
          <Route path="/about/:name" component={AboutPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
        <Route path="/posts" component={PostsPage} />
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
