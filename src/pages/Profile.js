import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";

const Profile = () => {
    return (
        
        <div>
            <img src={background} alt="background" className="background"/>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile