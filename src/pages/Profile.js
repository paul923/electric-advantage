import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";
import { Button, Form, Carousel } from "react-bootstrap";

const Profile = () => {
    return (
        <body className="body">
            <div className="TopImage">
                <img className="d-block w-100" src={background} alt="background" />
            </div>
            <div>
                <div className="content">
                    <h2 className="registrationText">Profile</h2>

                    <div className="leftColumn">
                        <Form>
                            <Form.Group controlId="Firstname">
                                <Form.Control type="email" placeholder="First Name" />
                                <Form.Text />
                            </Form.Group>
                            <Form.Group controlId="LastName" className="leftColumnChildren">
                                <Form.Control type="email" placeholder="Last Name" />
                                <Form.Text />
                            </Form.Group>
                        </Form>
                        <Button className="btn-success leftColumnChildren">Change Email/Password</Button>

                    
                    </div>
                </div>
                </div>

       
        </body>




    )
}

export default Profile
