import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./css/Home.css";
import SignUpModal from "../components/SignUpModal";

export default function Home() {
  const [registrationState, setRegistrationState] = useState(false);
  const [modalState, setModalState] = useState(false);

  return (
    <div style={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    }}>
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
