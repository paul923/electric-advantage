import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <CoordinateContext.Provider value={this.state.coordinate}>
        <div style={{ padding: "4vh" }}>
          <Menu />
          <AuthProvider>

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
            />gdf
            <Route path="/search-detail" component={SearchDetail} />
          </Switch>
          <Route path="/api-test" component={TestingPage} />
          <AdminPrivateRoute path="/admin" component={AdminMenu} />
          <AdminPrivateRoute path="/1" component={Subscriptions} />
          <AdminPrivateRoute path="/2" component={Vehicles} />
          <AdminPrivateRoute path="/3" component={Dealers} />
          <AdminPrivateRoute path="/4" component={RegisterMake} />
          <AdminPrivateRoute path="/5" component={RegisterModel} />
          <AdminPrivateRoute path="/6" component={DealershipSignUp} />

          <DealershipPrivateRoute path="/dealer" component={DealerMenu} />
          <DealershipPrivateRoute path="/accountinfo" component={AccountInfo} />
          <DealershipPrivateRoute
            path="/subscription"
            component={Subscription}
          />
          <DealershipPrivateRoute path="/inventory" component={Inventory} />
          <DealershipPrivateRoute
            path="/dealerprofile"
            component={DealershipProfilePage}
          />
          <DealershipPrivateRoute path="/addList" component={AddList} />
          </AuthProvider>

        </div>
      </CoordinateContext.Provider>
  )
}

export default App
