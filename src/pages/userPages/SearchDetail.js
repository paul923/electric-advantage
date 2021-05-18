import React from 'react'
import carImage from "../../images/tesla.jpg";
import "../css/Home.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const SearchDetail = () => {


    return (
        <body>
            <div>
                      
            <div className="test">
            <h1>Details</h1>
         
            <h3>3.5 km away</h3>
            </div>
         
            

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
