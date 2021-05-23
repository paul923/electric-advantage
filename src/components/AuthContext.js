import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { getUserByUserId } from "../api/UserAPI";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState();
  const [searchedUser, setSearchedUser] = useState(null);
  const [userId, setUserId] = useState("")
  const [userObject, setUserObject] = useState("")


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    setUserType("CUSTOMER")
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function GetUserType(id) {
    if (id === null) {
      setUserType("CUSTOMER")
    } else {
      let resultUser = await getUserByUserId(id);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        console.log("usertypeId")
        console.log(body.UserTypeID)
        setUserType(body.UserTypeID)
      } else {
        alert(`Status : ${statusCode}, ${resultUser.error}`);
      }
    }
  }

  async function GetUserObject(id) {
    if (id === null) {
      setUserObject(null)
    } else {
      let resultUser = await getUserByUserId(id);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        console.log("userobject")
        console.log(body)
        setUserObject(body)
      } else {
        alert(`Status : ${statusCode}, ${resultUser.error}`);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(user)
      if (user) {
      GetUserType(user.uid)
      GetUserObject(user.uid)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    userType,
    userObject
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
