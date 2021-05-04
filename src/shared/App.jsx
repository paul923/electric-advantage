import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, WhoWeAre, ContactUs, SignIn } from "../pages";
import Menu from "../components/Menu";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Menu />
            <Route exact path="/" exact component={Home} />
            <Switch>
              <Route path="/who-we-are" component={WhoWeAre} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/sign-in" component={SignIn} />
            </Switch>
        </Router>
        <img src="../../images/background.png" alt="?"/>
      </div>
    );
  }
}
