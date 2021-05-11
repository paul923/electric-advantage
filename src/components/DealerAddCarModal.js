import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import "../pages/css/dealerAddCarModal.css";
import React from "react";

const DealerAddCarModal = ({
  showModal,
  setShowModal,
  setCarsToAdd,
  carsToAdd,
}) => {
  const [carMake, setCarMake] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carTrim, setCarTrim] = React.useState("");
  const [carPrice, setCarPrice] = React.useState("");
  const [carQty, setQty] = React.useState("");
  const [carColor, setColor] = React.useState("");
  const [carID, setID] = React.useState("");
  const [carInfo, setInfo] = React.useState("");
  const [carImgs, setImgs] = React.useState("");

  const carMakeHandler = (e) => {
    setCarMake(e.target.value);
  };

  const addCarsHandler = () => {
    setCarsToAdd([
      ...carsToAdd,
      {
        carMake: carMake,
        carModel: carModel,
        carTrim: carTrim,
        Qty: carQty,
        carPrice: carPrice,
        color: carColor,
        info: carInfo,
        images: carImgs,
        carID: carID,
      },
    ]);
  };

  return (
    <Modal show={showModal} aria-label="Close">
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="carMake">
            <Form.Control
              onChange={(e) => setCarMake(e.target.value)}
              as="select"
            >
              <option disabled selected>
                Select Make...
              </option>
              <option value="Hyundai">Hyundai</option>
              <option value="Toyota">Toyota</option>
              <option value="Porche">Porche</option>
              <option value="Tesla">Tesla</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            onChange={(e) => setCarModel(e.target.value)}
            controlId="carModel"
          >
            <Form.Control as="select">
              <option disabled selected>
                Select Model...
              </option>
              <option value="X">X</option>
              <option value="Y">Y</option>
              <option value="Z">Z</option>
              <option value="M">M</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            onChange={(e) => setCarTrim(e.target.value)}
            controlId="carTrim"
          >
            <Form.Control as="select">
              <option disabled selected>
                Select Trim...
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Row>
          <Col>
            <div>
              Qty:{" "}
              <input
                onChange={(e) => setQty(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Price:{" "}
              <input
                onChange={(e) => setCarPrice(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Color:{" "}
              <input
                onChange={(e) => setColor(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
        </Row>
        <Form>
          <textarea
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Additional Information..."
            className="detailsInput"
          ></textarea>
          <Form.File multiple className="fileInput"></Form.File>
        </Form>
        <Row></Row>
      </Modal.Body>
      <Modal.Footer className="footerButtons">
        <Button
          onClick={() => setShowModal(false)}
          className="footerButtons"
          variant="secondary"
        >
          Close
        </Button>
        <Button
          className="btn-success footerButtons"
          onClick={() => {
            setShowModal(false);
            addCarsHandler();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DealerAddCarModal;
