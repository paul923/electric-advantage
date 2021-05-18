import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";
import background from "../../images/background.jpg";
import carImage from "../../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import { Card, Table, Row, Col, Form, Container } from "react-bootstrap";

export default function SearchResult() {
  const [priceValue, setPriceValue] = React.useState(125000);
  const [rangeValue, setRangeValue] = React.useState(500);

    const cardInfo = [
        {image: carImage, make: "Tesla", model: "Model 3", trim: "Trim", odometer: "30,000km", color: "White", year: "2020", price: "$40,000"},
        {image: carImage, make: "Tesla", model: "Model 3", trim: "Trim", odometer: "30,000km", color: "White", year: "2020", price: "$40,000"},
        {image: carImage, make: "Tesla", model: "Model 3", trim: "Trim", odometer: "30,000km", color: "White", year: "2020", price: "$40,000"},
        {image: carImage, make: "Tesla", model: "Model 3", trim: "Trim", odometer: "30,000km", color: "White", year: "2020", price: "$40,000"}
    ]

    const renderCard = (card, index) => {
        return (
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
        )
    }

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
                        <select className="make-dropdown">
                        <option value="make1">make1</option>
                        <option value="make2">make2</option>
                        <option value="make3">make3</option>
                        </select>
                    </div>
                    </Col>

                    <Col>
                    <div className="statusColumn">
                    <div className="statusTitle">
            <h3>Status</h3>
            </div>
                        <select className="status-dropdown">
                        <option value="new">New</option>
                        <option value="used">Used</option>
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
                    <Button className="searchButton">
                        <NavLink to="/search-result" className="nav-search">Search</NavLink>
                    </Button>
                    </Col>

                </Row>
        </div>


        {/* <Button className="emailAlertButton">Send Email Alert</Button> */}
        <div className="results"> {cardInfo.map(renderCard)} </div>
    </body>
  );
}
