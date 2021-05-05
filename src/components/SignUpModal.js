import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";

const SignUpModal = ({
  modalState,
  setRegistrationState,
  registrationState,
  setModalState,
}) => {
  const userRegistrationHandler = (e) => {
    setRegistrationState(e.target.value);
  };

  return (
    <Modal show={modalState} aria-label="Close">
      <Modal.Header>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="accountType">
            <Form.Label>Account Type</Form.Label>
            <Form.Control as="select" onChange={userRegistrationHandler}>
              <option value="buyer">Buyer</option>
              <option value="dealer">Dealer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label> Email Address</Form.Label>
            <Form.Control type="email" placeholder="Example@email.com" />
            <Form.Text />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label> Password</Form.Label>
            <Form.Control type="email" placeholder="Password" />
            <Form.Text />
          </Form.Group>
          <Form.Group
            className={`${registrationState === "dealer" ? "dealer" : "buyer"}`}
            controlId="Subscription Plan"
          >
            <Form.Label> Plan </Form.Label>
            <Form.Control as="select">
              <option> Plan 1 </option>
              <option> Plan 2 </option>
              <option> Plan 3 </option>
              <option> Plan 4 </option>
              <option> Plan 5 </option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setModalState(false);
            setRegistrationState(false);
          }}
        >
          Close
        </Button>
        <Button className="btn-success">Sign Up</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
