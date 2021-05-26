import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Select, MenuItem, TextField } from "@material-ui/core";
import { useAuth } from "../components/AuthContext";
import { Link, useHistory } from "react-router-dom";
import TYPE from "../constants/UserType";
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";
import _uniqueId from 'lodash/uniqueId';
import firebase from "firebase/app";
import { auth } from "../firebase"





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
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(TYPE.CUSTOMER);
  const [userOpen, setUserOpen] = useState(false);
  const [makeList, setMakeList] = useState("");
  const [modelList, setModelList] = useState("");
  const [selectedMakeID, setSelectedMakeID] = useState("");
  const [id] = useState(_uniqueId('testID-'));
  


  



  async function handleSubmit(e) {
    e.preventDefault();
    setUserType("CUSTOMER")

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await onPressCreateUser();
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }


  async function onPressCreateUser() {
    let userObj = {
      UserID: auth.currentUser.uid,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      UserTypeID: userType,
    };
    let result = await createUser(userObj);
  }




  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <a className="w-100 text-center mt-3"  href="mailto:admin@electricadvantage.ca?subject=Dealer Register Request&body=Please fill out this information to register as dealership
          %0AFirst name:
          %0ALast name:
          %0AEmail:
          ">Dealership Registeration</a>
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
            <Button disabled={loading} className="w-100" type="submit">
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