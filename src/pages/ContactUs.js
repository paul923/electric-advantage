import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/ContactUs.css";
import { Button } from "react-bootstrap";

import background from "../images/background.jpg";

const ContactUs = () => {
    return (

        <div className = "contactus">
            <img src={background} alt="background" className="background" />
            <h1>Contact Us</h1>

        <div className = "textArea">
            <textarea placeholder='Send us a message..'></textarea>
        </div>
            <Button className="btn-send"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                Send
        </Button>
        </div>




    )
}

export default ContactUs
