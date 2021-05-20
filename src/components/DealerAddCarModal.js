import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import "../pages/css/dealerAddCarModal.css";
import React from "react";
import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
} from "../api/VehicleAPI";

const DealerAddCarModal = ({
  showModal,
  setShowModal,
  setCarsToAdd,
  carsToAdd,
}) => {
  const [carMake, setCarMake] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carPrice, setCarPrice] = React.useState("");
  const [carQty, setQty] = React.useState("");
  const [carColor, setColor] = React.useState("");
  const [carID, setID] = React.useState("");
  const [carInfo, setInfo] = React.useState("");
  const [carImgs, setImgs] = React.useState("");
  const [makeList, setMakeList] = React.useState([]);
  const [selectedMake, setSelectedMake] = React.useState("1");
  const [modelList, setModelList] = React.useState([]);
  const [selectedModel, setSelectedModel] = React.useState("1");
  const [trimList, setTrimList] = React.useState([]);
  const [odo, setOdo] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [carVehicle, setCarVehicle] = React.useState("");

  const resetAllFieldsHandler = () => {
    setCarMake("");
    setCarModel("");
    setCarPrice("");
    setQty("");
    setColor("");
    setID("");
    setInfo("");
    setImgs("");
    setModelDisabled(true);
    setTrimDisabled(true);
  };

  React.useEffect(() => {
    onLoadGetMakeList();
    getModelList();
  }, []);

  React.useEffect(() => {
    getModelList();
  }, selectedMake);

  React.useEffect(() => {
    getVehiclesList();
  }, selectedModel);

  React.useEffect(() => {});

  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  async function getModelList() {
    let resultModelList = await getModelListByMakeID(selectedMake);
    let statusCode = resultModelList.status;
    if (statusCode === 200) {
      let body = resultModelList.body;
      setModelList(body);
      setCarModel(resultModelList.body[0].ModelName);
      setSelectedModel(resultModelList.body[0].ModelID);
    } else {
      alert(`Status : ${statusCode}, ${resultModelList.error}`);
    }
  }

  async function getVehiclesList() {
    let resultTrimList = await getVehicleListByMakeIDAndModelID(
      selectedMake,
      selectedModel
    );
    let statusCode = resultTrimList.status;
    if (statusCode === 200) {
      let body = resultTrimList.body;
      setCarVehicle(carModel + " " + body[0].Trim + " " + body[0].Year);
      setTrimList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultTrimList.error}`);
    }
  }

  const [modelDisabled, setModelDisabled] = React.useState(true);
  const [trimDisabled, setTrimDisabled] = React.useState(true);

  // carMake,
  // carVehicle,
  // Odo,
  // carPrice,
  // Qty,
  // carColor,
  // car,
  // carsToAdd,
  // condition,
  // setCarsToAdd,

  const addCarsHandler = () => {
    setCarsToAdd([
      ...carsToAdd,
      {
        carMake: carMake,
        carVehicle: carVehicle,
        Odo: odo,
        Qty: carQty,
        carPrice: carPrice,
        carColor: carColor,
        info: carInfo,
        carCondition: condition,
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
              onChange={(e) => {
                let carMakeObject = JSON.parse(e.target.value);
                setCarMake(carMakeObject.MakeName);
                setModelDisabled(false);
                setSelectedMake(carMakeObject.MakeID);
                // setTrimDisabled(true);
                setTrimList([]);
              }}
              as="select"
            >
              <option disabled selected>
                Select Make...
              </option>
              {makeList.map((carMake) => (
                <option value={JSON.stringify(carMake)}>
                  {carMake.MakeName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="carModel">
            <Form.Control
              onChange={(e) => {
                let carModelObject = JSON.parse(e.target.value);
                setCarModel(carModelObject.ModelName);
                setTrimDisabled(false);
                setSelectedModel(carModelObject.ModelID);
              }}
              as="select"
              disabled={modelDisabled}
            >
              <option disabled selected>
                Select Model...
              </option>
              {modelList.map((carModel) => (
                <option value={JSON.stringify(carModel)}>
                  {carModel.ModelName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            onChange={(e) => {
              let vehicleObject = JSON.parse(e.target.value);
              setCarVehicle(
                carModel + " " + vehicleObject.Trim + " " + vehicleObject.Year
              );
              console.log(
                "vehicleObject.VehicleID: " + vehicleObject.VehicleID
              );
            }}
            controlId="carTrim"
          >
            <Form.Control as="select" disabled={trimDisabled}>
              <option disabled selected>
                Select Vehicle...
              </option>
              {trimList.map((vehicle) => (
                <option value={JSON.stringify(vehicle)}>
                  {carModel + " " + vehicle.Trim + " " + vehicle.Year}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          >
            <Form.Control as="select">
              <option disabled selected>
                Select Condition...
              </option>
              <option value={parseInt("1", 10)}>New</option>
              <option value={parseInt("2", 10)}>Used</option>
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
              Odometer:{" "}
              <input
                onChange={(e) => setOdo(e.target.value)}
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
          onClick={() => {
            setShowModal(false);
            resetAllFieldsHandler();
          }}
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
            resetAllFieldsHandler();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DealerAddCarModal;
