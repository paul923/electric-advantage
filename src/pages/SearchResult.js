import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";
import carImage from "../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

export default function SearchResult() {
  const cardInfo = [
    /* GET SEARCHED CARS HERE */
    {
      // onLoadGetVehicleSearchResult()
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
  ];

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
    );
  };

  return (
    <body>
      <h2>Search Result</h2>
      <Button className="emailAlertButton">Send Email Alert</Button>
      <div className="results"> {cardInfo.map(renderCard)} </div>
    </body>
  );
}
