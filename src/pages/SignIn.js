import React from "react";
import { Button, Form, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./css/Home.css";
import SignUpModal from "../components/SignUpModal";
import background from "../images/background.jpg";

const SignIn = () => {
  const [registrationState, setRegistrationState] = useState("customer");
  const [modalState, setModalState] = useState(false);

  return (
    <body className="body">
      <div className="TopImage">
        <img
          className="d-block w-100"
          src={background}
          alt="background"
          className="background"
        />
      </div>
      <div>
        <div className="content">
          <h2 className="registrationText">Log In</h2>

          <div className="login rightColumn">
            <h2 className="registrationText">Register</h2>
          </div>
          <div className="leftColumn">
            <Form>
              <Form.Group controlId="Username">
                <Form.Control type="email" placeholder="Email" />
                <Form.Text />
              </Form.Group>
              <Form.Group controlId="Password" className="leftColumnChildren">
                <Form.Control type="email" placeholder="Password" />
                <Form.Text />
              </Form.Group>
            </Form>
            <Button className="btn-success leftColumnChildren">Log In</Button>
          </div>
          <div className="rightColumn">
            <Button
              className="btn-success signUpButtons"
              onClick={() => setModalState(true)}
            >
              Customer
            </Button>
            <Button
              className="btn-success signUpButtons"
              onClick={() => {
                setModalState(true);
                setRegistrationState("dealer");
              }}
            >
              Dealer
            </Button>
            <SignUpModal
              modalState={modalState}
              setRegistrationState={setRegistrationState}
              registrationState={registrationState}
              setModalState={setModalState}
            />
          </div>
        </div>
      </div>
    </body>
  );
};

export default SignIn;
