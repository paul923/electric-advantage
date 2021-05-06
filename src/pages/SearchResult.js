import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";
import carImage from "../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function SearchResult() {
    const cardInfo = [
        {image: carImage, title: "Tesla", price: "$40,000", distance: "3.5km away", range: "500km" },
        {image: carImage, title: "Tesla", price: "$40,000", distance: "3.5km away", range: "500km" },
        {image: carImage, title: "Tesla", price: "$40,000", distance: "3.5km away", range: "500km" },
        {image: carImage, title: "Tesla", price: "$40,000", distance: "3.5km away", range: "500km" }
    ]

    const renderCard = (card, index) => {
        return (
            <Card className="carCard">
                <Card.Img variant="top" src={card.image} className="carImage" />
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.price}</Card.Text>
                    <Card.Text>{card.distance}</Card.Text>
                    <Card.Text>{card.range}</Card.Text>
                    <Button className="carDetailsButton">
                      <NavLink to="/search-detail" className="nav-search">
                        Details
                      </NavLink>
                    </Button>
                    <Button className="carContactButton">Contact</Button>
                </Card.Body>
            </Card>
        )
    }

  return (
    <body>
        <div>
            <img src={background} alt="background" className="background"/>
            <div className="searchResultContent">
        <div className="priceColumn">
          <h3>Price</h3>
          <select className="price-dropdown">
            <option value="minprice">$0 ~ $20,000</option>
            <option value="40000">$20,000 ~ $40,000</option>
            <option value="60000">$40,000 ~ $60,000</option>
            <option value="80000">$60,000 ~ $80,000</option>
            <option value="100000">$80,000 ~ $100,000</option>
            <option value="200000">$100,000 ~ $200,000</option>
            <option value="300000">$200,000 ~ $300,000</option>
            <option value="400000">$300,000 ~ $400,000</option>
            <option value="500000">$400,000 ~ $500,000</option>
            <option value="maxprice">$500,000 ~ </option>
          </select> 
        </div>

        <div className="rangeColumn">
          <h3>Range</h3>
          <select className="range-dropdown">
              <option value="200km">0km ~ 200km</option>
              <option value="300km">200km ~ 300km</option>
              <option value="400km">300km ~ 400km</option>
              <option value="500km">400km ~ 500km</option>
              <option value="600km">500km ~ 600km</option>
          </select>
        </div>

        <div className="makeColumn">
          <h3>Make</h3>
          <select className="make-dropdown">
              <option value="tesla">Tesla</option>
              <option value="porshce">Porsche</option>
              <option value="ford">Ford</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="volkswagen">Volkswagen</option>
              <option value="bmw">BMW</option>
          </select>
        </div>

        <div className="modelColumn">
          <h3>Model</h3>
          <select className="model-dropdown">
            <option value="tesla">Model S</option>
            <option value="taycan">Taycan</option>
            <option value="mustang">Mustang</option>
            <option value="bolt">Bolt EV</option>
            <option value="e-golf">E-Golf</option>
            <option value="i3">i3</option>
          </select>
        </div>

        <div className="trimColumn">
          <h3>Trim</h3>
          <select className="trim-dropdown">
            <option value="trim1">Trim 1</option>
            <option value="trim2">Trim 2</option>
            <option value="trim3">Trim 3</option>
            <option value="trim4">Trim 4</option>
            <option value="trim5">Trim 5</option>
          </select>
        </div>

        <div className="postalColumn">
          <h3>Postal Code</h3>
          <input type="text" className="postal"></input>
        </div>

        <div className="searchButtonColumn">
        <Button className="searchResultButton"
          style={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <NavLink to="/search-result" className="nav-search">Search</NavLink>
        </Button>
        </div>

      </div>


    </div>
        <h2>Search Result</h2>
        <div className="results"> {cardInfo.map(renderCard)} </div>
    </body>
  );
}