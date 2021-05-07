import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";
import { Select, MenuItem } from "@material-ui/core";
import TYPE from "../constants/UserType";

export default function TestingPage() {
  const [usersList, setUsersList] = React.useState(null);
  const [searchUserId, setSearchUserId] = React.useState("");
  const [searchedUser, setSearchedUser] = React.useState(null);
  const [userId, setUserId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState(TYPE.CUSTOMER);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {});

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  async function onPressGetUsersList() {
    let resultUsers = await getUsersList();
    let statusCode = resultUsers.status;
    let body = resultUsers.body;
    if (statusCode === 200) {
      setUsersList(body);
    } else {
      alert(`Status : ${statusCode}, ${body}`);
    }
  }

  async function onPressGetUserById() {
    if (!searchUserId) {
      alert("no id entered!");
    } else {
      let resultUser = await getUserByUserId(searchUserId);
      let statusCode = resultUser.status;
      let body = resultUser.body[0];
      if (statusCode === 200) {
        setSearchedUser(body);
      } else {
        alert(`Status : ${statusCode}, ${body}`);
      }
    }
  }

  async function onPressCreateUser() {
    let userObj = {
      UserID: userId,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      UserType: userType,
    };
    let result = await createUser(userObj);
    alert(`Status : ${result.status}, ${result.body}`);
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

  const createUserForm = () => {
    return (
      <form>
        <h1>Create User</h1>
        <TextField
          id="outlined-basic"
          label="userid"
          variant="outlined"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={userType}
          onChange={handleChange}
        >
          <MenuItem value={TYPE.CUSTOMER}>Customer</MenuItem>
          <MenuItem value={TYPE.DEALERSHIP}>Dealership</MenuItem>
          <MenuItem value={TYPE.ADMIN}>Admin</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPressCreateUser()}
        >
          Create User
        </Button>
      </form>
    );
  };

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
      <br />
      {createUserForm()}
    </div>
  );
}
