import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./css/Home.css";
import SignUpModal from "./pageComponents/SignUpModal";

export default function Home() {
  const [registrationState, setRegistrationState] = useState(false);
  const [modalState, setModalState] = useState(false);

  return (
    <div>
      <Button className="btn-success" onClick={() => setModalState(true)}>
        Sign Up
      </Button>
      <SignUpModal
        modalState={modalState}
        setRegistrationState={setRegistrationState}
        registrationState={registrationState}
        setModalState={setModalState}
      />
    </div>
  );
}
