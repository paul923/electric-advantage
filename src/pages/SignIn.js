import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import SignUpModal from "./pageComponents/SignUpModal";

const SignIn = () => {
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
    )
}

export default SignIn;
