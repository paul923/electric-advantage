import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/landing.css";

import carImage1 from "../images/kia.jpg";
import carImage2 from "../images/bmw.jpg";
import carImage3 from "../images/jp.jpg";
import carImage4 from "../images/ford.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card, Table } from "react-bootstrap";



export default function LandingPage() {
    const cardInfo = [
        { image: carImage1, name: "Dt Kia", number: "50" },
        { image: carImage2, name: "Brian Jessel Dt", number: "37" },
        { image: carImage3, name: "Jim Pattison Dt", number: "2" },
        { image: carImage4, name: "Ford Dt", number: "28" }
    ]

    const renderCard = (card, index) => {
        return (
            <div className="dealerCard">
                <img src={card.image} className="dealerImage" />

                <Table striped hover className="dealerTable">
                    <tbody>
                        <tr>
                            <td>{card.name}</td>
                            <td>Inventory: {card.number}</td>

                        </tr>


                    </tbody>
                </Table>


            </div>
        )
    }

    return (
        <body>
            <h2>Top 4 Dealerships in your Region</h2>

            <div className="dealerResults"> {cardInfo.map(renderCard)} </div>


            <div className="makeColumn">
                <h3>Make</h3>
                <select className="make-dropdown">
                    <option value="make1">make1</option>
                    <option value="make2">make2</option>
                    <option value="make3">make3</option>
                </select>
            </div>

            <div className="statusColumn">
                <h3>Status</h3>
                <select className="status-dropdown">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>



     

            
            <Button className="searchButton">Search</Button>
        </body>
        
    );
}

