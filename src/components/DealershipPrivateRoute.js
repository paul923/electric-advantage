import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function DealershipPrivateRoute({ component: Component, ...rest }) {
  const { currentUser, userType, dealerObjectId } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return (userType === "DEALERSHIP") ? <Component {...props} /> : <Component {...props} />
      }}
    ></Route>
  )
}
