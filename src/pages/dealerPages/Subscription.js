import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/dealerSubscription.css";

export default function DealerSubscription() {
  /* Default is dealers current plan */
  const [planSelected, setPlanSelected] = React.useState("Current Plan");
  return (
    <div>
      <h2 className="mainHeader">Subscription Details</h2>
      <hr />
      <Form className="subcriptionForm">
        <Form.Label>Subscription Plan:</Form.Label>
        <Form.Group as="select" className="planBox" onChange>
          <option disabled selected>
            Select Plan...
          </option>
          <option value="standard1">Standard 1 Month $59.99</option>
          <option value="standard6">Standard 6 Months $299.99</option>
          <option value="standard12">Standard 12 Months $539.99</option>
          <option value="premium1">Premium 1 Month $89.99</option>
          <option value="premium6">Premium 6 Months $499.99</option>
          <option value="premium12">Premium 12 Months $799.99</option>
        </Form.Group>
        <div className="buttonDiv">
          <Button>Confirm</Button>
        </div>
      </Form>
    </div>
  );
}
