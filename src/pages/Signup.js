import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Select, MenuItem, TextField } from "@material-ui/core";
import { useAuth } from "../components/AuthContext";
import { Link, useHistory } from "react-router-dom";
import TYPE from "../constants/UserType";
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";
import _uniqueId from 'lodash/uniqueId';



export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const customerRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const dealerRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [userId, setUserId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState(TYPE.CUSTOMER);
  const [userOpen, setUserOpen] = React.useState(false);
  const [makeList, setMakeList] = React.useState("");
  const [modelList, setModelList] = React.useState("");
  const [selectedMakeID, setSelectedMakeID] = React.useState("");
  const [id] = useState(_uniqueId('testID-'));





  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }


  async function onPressCreateUser() {
    let userObj = {
      UserID: {id}[1],
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      UserTypeID: userType,
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


  return (
    <>


      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="text-center">

            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={userOpen}
              onClose={() => setUserOpen(false)}
              onOpen={() => setUserOpen(true)}
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}   
                       >
              <MenuItem value={TYPE.CUSTOMER}>Customer</MenuItem>
              <MenuItem value={TYPE.DEALERSHIP}>Dealership</MenuItem>
              <MenuItem value={TYPE.ADMIN}>Admin</MenuItem>
            </Select>
            </div>
            {/* <div className="display-none">
            <Form.Group id="userid" >
              <Form.Label>User id</Form.Label>
              <Form.Control type="text" value={id} onChange={(event) => setUserId(event.target.value)} required />
            </Form.Group>
            </div> */}
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef}  required value={firstname}
          onChange={(event) => setFirstname(event.target.value)}/>
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required value={lastname}
          onChange={(event) => setLastname(event.target.value)}/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required value={email}
          onChange={(event) => setEmail(event.target.value)}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            
            {/* <Form.Group id="plan">
              <Form.Label> Plan </Form.Label>
              <Form.Control as="select" defaultValue="Basic Plan">
                <option>Basic Plan</option>
                <option>Advanced Plan</option>
              </Form.Control>
            </Form.Group> */}

            <Button disabled={loading} className="w-100" type="submit" onClick={() => onPressCreateUser()}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <TextField
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
          open={userOpen}
          onClose={() => setUserOpen(false)}
          onOpen={() => setUserOpen(true)}
          value={userType}
          onChange={(event) => {
            setUserType(event.target.value);
          }}
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
        </Button> */}
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
