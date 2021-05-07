import React from "react";
import { Button, Form, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./css/Home.css";
import SignUpModal from "./pageComponents/ProfilePopUp";
import background from "../images/background.jpg";

const Profile = () => {
  const [registrationState, setRegistrationState] = useState("customer");
  const [modalState, setModalState] = useState(false);

  return (
    <body className="body">
      <div className="TopImage">
        <img className="d-block w-100" src={background} alt="background" className="background"/>
      </div>
      <div>
        <div className="content">
          <h2 className="registrationText">Profile</h2>

          <div className="login rightColumn">
            <h2 className="registrationText"></h2>
          </div>
          <div className="leftColumn">
            <Form>
              <Form.Group controlId="Name">
                <Form.Control type="email" placeholder="Name" />
                <Form.Text />
              </Form.Group>
              <Form.Group controlId="Email" className="leftColumnChildren">
                <Form.Control type="email" placeholder="Email" />
                <Form.Text />
              </Form.Group>
            </Form>

          </div>
          <div className="rightColumn">
            
            <Button
              className="btn-success signUpButtons"
              onClick={() => {
                setModalState(true);
                setRegistrationState("password");
              }}
            >
              Change Password
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

export default Profile;
