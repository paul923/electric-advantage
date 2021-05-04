import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getUsersList, getUserByUserId } from "../api/UserAPI";

export default function TestingPage() {
  const [usersList, setUsersList] = React.useState(null);
  const [searchUserId, setSearchUserId] = React.useState("");
  const [searchedUser, setSearchedUser] = React.useState(null);

  React.useEffect(() => {});

  async function onPressGetUsersList() {
    let resultUsers = await getUsersList();
    console.log(resultUsers);
    setUsersList(resultUsers);
  }

  async function onPressGetUserById() {
    if (!searchUserId) {
      alert("no id entered!");
    } else {
      let resultUser = await getUserByUserId(searchUserId);
      setSearchedUser(resultUser);
    }
  }

  function formatUser(userObject) {
    return (
      <div>
        <h2>User ID: {userObject.UserID}</h2>
        <p>
          First Name: {userObject.FirstName}
          <br />
          Last Name: {userObject.LastName}
          <br />
          Email: {userObject.Email}
          <br />
          User Type Id: {userObject.UserTypeID}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>User List</h2>
      {usersList &&
        usersList.map((user, index) => {
          return <div key={index}>{formatUser(user)}</div>;
        })}
      <Button
        variant="contained"
        color="primary"
        onClick={() => onPressGetUsersList()}
      >
        Get users
      </Button>

      <br />
      <h2>Searched User</h2>
      {searchedUser && formatUser(searchedUser)}
      <form>
        <TextField
          id="outlined-basic"
          label="User Id"
          variant="outlined"
          value={searchUserId}
          onChange={(event) => setSearchUserId(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPressGetUserById()}
        >
          Get user by id
        </Button>
      </form>
    </div>
  );
}
