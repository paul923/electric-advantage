import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";
import background from "../../images/background.jpg";
import carImage from "../../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import { Card, Table, Row, Col, Form, Container } from "react-bootstrap";
import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
  getVehicleSearchResult,
} from "../../api/VehicleAPI";

const SearchResult = (props) => {
  const [priceValue, setPriceValue] = React.useState(125000);
  const [rangeValue, setRangeValue] = React.useState(500);

  const [makeID, setMakeID] = React.useState(props.location.state.makeInput);
  const [range, setRange] = React.useState(props.location.state.rangeInput);
  const [price, setPrice] = React.useState(props.location.state.priceInput);
  const [condition, setCondition] = React.useState(
    props.location.state.conditionIDInput
  );
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [makeList, setMakeList] = React.useState(
    props.location.state.theMakeList
  );
  const [carCards, setCarCards] = React.useState([]);

  let resultSearch = [];

  async function onLoadGetVehicleSearchResult() {
    resultSearch = await getVehicleSearchResult(
      makeID,
      range,
      price,
      condition,
      lat,
      long
    );

    if (resultSearch["body"] != undefined) {
      setCarCards(
        resultSearch["body"].map((car) => {
          return {
            image: carImage,
            make: car["MakeID"],
            model: car["ModelName"],
            trim: car["Trim"],
            odometer: car["Odometer"].toLocaleString("en") + " km",
            color: car["ColorID"],
            year: car["Year"],
            price: "$" + car["StartPrice"].toLocaleString("en"),
          };
        })
      );
    } else setCarCards([]);
    console.log(makeID, range, price, condition, lat, long);
  }

  function success(pos) {
    setLat(pos.coords.latitude);
    setLong(pos.coords.longitude);
    console.log(
      `Longitude : ${pos.coords.longitude}\nLatitude : ${pos.coords.latitude}`
    );
  }

  function error(err) {
    alert("Turn on geolocation!");
  }

  function onLoadCheckGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Must turn on Geolocation!");
    }
  }

  React.useEffect(() => {
    onLoadGetVehicleSearchResult();
    onLoadCheckGeolocation();
  }, []);

  // const renderCard = (card, index) => {
  //   return (
  //     <div className="carCard">
  //       <img src={card.image} className="carImage" />

  //       <Table striped hover className="carTable">
  //         <tbody>
  //           <tr>
  //             <td>Make: {card.make}</td>
  //             <td>Model: {card.model}</td>
  //             <td>Trim: {card.trim}</td>
  //           </tr>
  //           <tr>
  //             <td colSpan="2">Odometer: {card.odometer}</td>
  //             <td>Color: {card.color}</td>
  //           </tr>
  //           <tr>
  //             <td colSpan="2">Vehicle Year: {card.year}</td>
  //             <td>Price: {card.price}</td>
  //           </tr>
  //         </tbody>
  //       </Table>

  //       <Button className="carDetailsButton">
  //         <NavLink to="/search-detail" className="nav-search">
  //           Details
  //         </NavLink>
  //       </Button>
  //     </div>
  //   );
  // };

  return (
    <body>
      <h2>Search Result</h2>
      <div>
        <Row>
          <Col>
            <div className="makeColumn">
              <div className="makeTitle">
                <h3>Make</h3>
              </div>
              <select
                className="make-dropdown"
                onChange={(e) => setMakeID(e.target.value)}
              >
                {makeList.map((make) => (
                  <option value={make.MakeID}>{make.MakeName}</option>
                ))}
              </select>
            </div>
          </Col>

          <Col>
            <div className="statusColumn">
              <div className="statusTitle">
                <h3>Status</h3>
              </div>
              <select
                className="status-dropdown"
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value={parseInt("1", 10)}>New</option>
                <option value={parseInt("2", 10)}>Used</option>
              </select>
            </div>
          </Col>

          <Col>
            <section className="range">
              <div className="priceColumn">
                <div className="priceTitle">
                  <h3>Price</h3>
                </div>
                <Container>
                  <RangeSlider
                    max={250000}
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    variant="success"
                  />
                </Container>
              </div>
            </section>
          </Col>

          <Col>
            <section className="range">
              <div className="rangeColumn">
                <div className="rangeTitle">
                  <h3 className="">Range</h3>
                </div>
                <Container>
                  <RangeSlider
                    max={1000}
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                    variant="success"
                  />
                </Container>
              </div>
            </section>
          </Col>

          <Col>
            <Button
              className="searchButton"
              onClick={() => {
                setRange(rangeValue);
                setPrice(priceValue);
                onLoadGetVehicleSearchResult();
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
      {/* <Button className="emailAlertButton">Send Email Alert</Button> */}
      <div className="results">
        {" "}
        {carCards.map((card) => (
          <div className="carCard">
            <img src={card.image} className="carImage" />

            <Table striped hover className="carTable">
              <tbody>
                <tr>
                  <td>Make: {card.make}</td>
                  <td>Model: {card.model}</td>
                  <td>Trim: {card.trim}</td>
                </tr>
                <tr>
                  <td colSpan="2">Odometer: {card.odometer}</td>
                  <td>Color: {card.color}</td>
                </tr>
                <tr>
                  <td colSpan="2">Vehicle Year: {card.year}</td>
                  <td>Price: {card.price}</td>
                </tr>
              </tbody>
            </Table>

            <Button className="carDetailsButton">
              <NavLink to="/search-detail" className="nav-search">
                Details
              </NavLink>
            </Button>
          </div>
        ))}{" "}
      </div>
    </body>
  );
};

export default SearchResult;
