import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Select, MenuItem } from "@material-ui/core";
import { useAuth } from "../components/AuthContext";
import { Link, useHistory } from "react-router-dom";
import TYPE from "../constants/UserType";
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";


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
  const [usersList, setUsersList] = React.useState(null);
  const [searchUserId, setSearchUserId] = React.useState("");
  const [searchedUser, setSearchedUser] = React.useState(null);
  const [userId, setUserId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState(TYPE.CUSTOMER);
  const [open, setOpen] = React.useState(false);


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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

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

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
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
            </div>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="email" ref={firstNameRef} required onChange={(event) => setFirstname(event.target.value)}/>
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="email" ref={lastNameRef} required onChange={(event) => setLastname(event.target.value)}/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required onChange={(event) => setEmail(event.target.value)}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="plan">
              <Form.Label> Plan </Form.Label>
              <Form.Control as="select" defaultValue="Basic Plan">
                <option>Basic Plan</option>
                <option>Advanced Plan</option>
              </Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit"  onClick={() => onPressCreateUser()}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
