import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";

const WhoWeAre = () => {
    return (
        
        <div>
            <img src={background} alt="background" className="background"/>
            <h1>Our History</h1>
            <h10>We started our company x years ago......</h10>
        </div>
    )
}

export default WhoWeAre
