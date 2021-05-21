import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";




const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [makeList, setMakeList] = useState("");
  const [usersList, setUsersList] = useState(null);
  const [searchUserId, setSearchUserId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  async function onPressGetUserById() {
    if (!searchUserId) {
      alert("no id entered!");
    } else {
      let resultUser = await getUserByUserId(searchUserId);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
      } else {
        alert(`Status : ${statusCode}, ${resultUser.error}`);
      }
    }
  }


  

   function onLoadGetMakeList() {
    let resultMakeList = getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      console.log(body);
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }
  


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
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
    onLoadGetMakeList
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
