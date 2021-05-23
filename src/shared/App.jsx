import React, { Component, createContext } from "react";
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
import DealershipProfilePage from "../pages/dealerPages/DealershipProfilePage";
import AdminPrivateRoute from "../components/AdminPrivateRoute";
import DealerMenu from "../components/DealersMenu";
import AdminMenu from "../components/AdminMenu";
import Subscriptions from "../pages/adminPages/Subscriptions";
import Vehicles from "../pages/adminPages/Vehicles";
import Dealers from "../pages/adminPages/Dealers";
import DealershipPrivateRoute from "../components/DealershipPrivateRoute";

export const CoordinateContext = createContext();

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      coordinate: { lat: 49.25056, lng: -123.01441 },
    };
  }

  componentDidMount() {
    this.onLoadCheckGeolocation();
  }

  success = (pos) => {
    this.setState({
      coordinate: { lat: pos.coords.latitude, lng: pos.coords.longitude },
    });
    console.log(
      `Longitude : ${pos.coords.longitude}\nLatitude : ${pos.coords.latitude}`
    );
  };

  error = (err) => {
    alert("Turn on geolocation!");
  };

  onLoadCheckGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      alert("Must turn on Geolocation!");
    }
  };

  render() {
    const userType = "customer";
    return (
      <CoordinateContext.Provider value={this.state.coordinate}>
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
          </Switch>

          <Switch>
            <Route
              path="/search-detail/:inventoryID"
              component={SearchDetail}
            />
            <Route path="/search-detail" component={SearchDetail} />
          </Switch>
          <Route path="/api-test" component={TestingPage} />
          <AdminPrivateRoute path="/admin" component={AdminMenu} />
          <AdminPrivateRoute path="/1" component={Subscriptions} />
          <AdminPrivateRoute path="/2" component={Vehicles} />
          <AdminPrivateRoute path="/3" component={Dealers} />

          <DealershipPrivateRoute path="/dealer" component={DealerMenu} />
          <DealershipPrivateRoute path="/accountinfo" component={AccountInfo} />
          <DealershipPrivateRoute
            path="/subscription"
            component={Subscription}
          />
          <DealershipPrivateRoute path="/inventory" component={Inventory} />
          <DealershipPrivateRoute path="/dealerprofile" component={DealershipProfilePage} />

          
        </div>
      </CoordinateContext.Provider>
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
