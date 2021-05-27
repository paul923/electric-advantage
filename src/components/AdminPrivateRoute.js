import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function AdminPrivateRoute({ component: Component, ...rest }) {
  const { currentUser, userType } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return userType === "ADMIN" ? <Component {...props} /> : <Component {...props} />
      }}
    ></Route>
  )
}
