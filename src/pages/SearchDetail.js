import React from 'react'
import carImage from "../images/tesla.jpg";
import "./css/Home.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const SearchDetail = () => {

    return (
        <body>
            <div>
                <div className="carDetailsContent">
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

            <h1>Details</h1>
            <h3>3.5 km away</h3>

            <div className="carDetailsWithImage">
            <img src={carImage} alt="carDetailsImage" className="carDetailsImage" />

            <div className="carDetails">
                <h4>Make</h4>
                <h4>Model</h4>
                <h4>Price</h4>
                <h4>Range</h4>
                <h4>Trim</h4>
                <h4>Color</h4>
            </div>
            
            <div className="carSpecific">
                <h4>Tesla</h4>
                <h4>Model 3</h4>
                <h4>$40,000</h4>
                <h4>500km</h4>
                <h4>Trim</h4>
                <h4>White</h4>
            </div>

            <div className="additionalInfo">
                <h3>Additional Information</h3>
                <Card className="infoCard">
                FREE CarProof report and Safety inspection available for review. 
                Large used car inventory! Open 7 days a week! IN HOUSE FINANCING available. 
                Close to 100% approval rate. Cash back options. 
                We accept all local and out of town trade-ins. 
                For additional vehicle information or to schedule your appointment, 
                call us or send an inquiry. Come and visit us: 2060 Oxford Connector, Port Coquitlam. 
                We also specialize in out of town deliveries.
                </Card>
            </div>

            </div>
            </div>
        </body>
    )
}

export default SearchDetail
