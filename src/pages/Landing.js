import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/landing.css";

import carImage1 from "../images/kia.jpg";
import carImage2 from "../images/bmw.jpg";
import carImage3 from "../images/jp.jpg";
import carImage4 from "../images/ford.jpg";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card, Table, Row, Col, Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function LandingPage() {
  const [priceValue, setPriceValue] = React.useState(125000);
  const [rangeValue, setRangeValue] = React.useState(500);

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

  return (
    <body>
        <div className = "box1"><h1>15 Dealerships</h1></div>
        <div className = "box2"><h1>215 New Cars</h1></div>
        <div className = "box3"><h1>55 Used Cars</h1></div>
      


      <h2>Top 4 Dealerships in your Region</h2>

      <div className="dealerResults"> {cardInfo.map(renderCard)} </div>

      <Row>
        <Col>
          <div className="makeColumn">
            <h3>Make</h3>
            <select className="make-dropdown">
              <option value="make1">make1</option>
              <option value="make2">make2</option>
              <option value="make3">make3</option>
            </select>
          </div>
        </Col>

        <Col>
          <div className="statusColumn">
            <h3>Status</h3>
            <select className="status-dropdown">
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </Col>

        <Col>
          <section className="range">
            <div className="priceColumn">
              <h3>Price</h3>
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
              <h3 className="">Range</h3>
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
          <Button className="searchButton">
            <NavLink to="/search-result" className="nav-search">Search</NavLink>
          </Button>
        </Col>

      </Row>


    </body>
  );
}
