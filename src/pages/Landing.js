import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/landing.css";

import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
  getVehicleSearchResult,
} from "../api/VehicleAPI";
import carImage1 from "../images/kia.jpg";
import carImage2 from "../images/bmw.jpg";
import carImage3 from "../images/jp.jpg";
import carImage4 from "../images/ford.jpg";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, Table, Row, Col, Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function LandingPage() {
  const [makeList, setMakeList] = React.useState([]);
  const [priceValue, setPriceValue] = React.useState(125000);
  const [rangeValue, setRangeValue] = React.useState(500);
  const [makeID, setMakeID] = React.useState(1);
  const [conditionID, setConditionID] = React.useState(1);
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const cardInfo = [
    { image: carImage1, name: "Downtown Kia", number: "50" },
    { image: carImage2, name: "Brian Jessel Downtown", number: "37" },
    { image: carImage3, name: "Jim Pattison Downtown", number: "2" },
    { image: carImage4, name: "Ford Downtown", number: "28" },
  ];

  const renderCard = (card, index) => {
    return (
      <div className="dealerCard">
        <img src={card.image} className="dealerImage" />

        <Table striped hover className="dealerTable">
          <tbody>
            <tr>
              <td>{card.name}</td>
              <td className="inventory">Inventory: {card.number}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  React.useEffect(() => {
    onLoadGetMakeList();
    onLoadCheckGeolocation();
  }, []);

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

  async function onClickgetVehicleSearchResult() {
    let resultSearch = await getVehicleSearchResult(
      makeID,
      rangeValue,
      priceValue,
      conditionID,
      lat,
      long
    );
    console.log("resultSearch:" + resultSearch[0]);
  }

  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      console.log(body);
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  return (
    <body>
      <div className="box1">
        <h1>15 Dealerships</h1>
      </div>
      <div className="box2">
        <h1>215 New Cars</h1>
      </div>
      <div className="box3">
        <h1>55 Used Cars</h1>
      </div>

      <h2>Top 4 Dealerships in your Region</h2>

      <div className="dealerResults"> {cardInfo.map(renderCard)} </div>

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
              onChange={(e) => setConditionID(e.target.value)}
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
                  max={500000}
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
          <Link
            to={{
              pathname: "/search-result",
              state: {
                makeInput: makeID,
                rangeInput: rangeValue,
                priceInput: priceValue,
                conditionIDInput: conditionID,
                latInput: lat,
                longInput: long,
              },
            }}
            className="nav-search"
          >
            <Button
              className="searchButton"
              onClick={() => setSearchResults(onClickgetVehicleSearchResult())}
            >
              Search
            </Button>
          </Link>
        </Col>
      </Row>
    </body>
  );
}
