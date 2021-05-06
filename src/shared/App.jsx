import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, WhoWeAre, ContactUs, SignIn, SearchResult, SearchDetail } from "../pages";
import Menu from "../components/Menu";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Menu />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/who-we-are" component={WhoWeAre} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/search-result" component={SearchResult} />
              <Route path="/search-detail" component={SearchDetail} />
            </Switch>
        </Router>
      </div>
    );
  }
}
