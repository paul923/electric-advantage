
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
<<<<<<< HEAD:src/pages/HomePage.js
import SignUpModal from "../components/SignUpModal";
=======
import background from "../images/background.jpg";
import { Button } from "react-bootstrap";
<<<<<<< HEAD:src/pages/HomePage.js
>>>>>>> homepage / search page created and logo added:src/pages/Home.js
=======
import { NavLink } from "react-router-dom";
>>>>>>> added search result page:src/pages/Home.js

export default function Home() {

  return (
    <body>
      <div>
        <img src={background} alt="background" className="background"/>
        <h2>Choose Region</h2>
      <div className="homeContent">
        <div className="priceColumn">
          <h3>Province</h3>
          <select className="price-dropdown">
            <option value="britishcolumbia">BC</option>
            <option value="alberta">AB</option>
            <option value="saskatchewan">SK</option>
            <option value="manitoba">MB</option>
            <option value="quebec">QC</option>
            <option value="newfoundland">NL</option>
            <option value="princeedwardisland">PE</option>
            <option value="novascotia">NS</option>
            <option value="newbrunswick">NB</option>
            <option value="ontario">ON</option>
            <option value="yukon">YT</option>
            <option value="northwest">NT</option>
            <option value="nunavut">NU</option>


          </select> 
        </div>

        <div className="rangeColumn">
          <h3>Region</h3>
          <select className="range-dropdown">
              <option value="vancouver">Vancouver</option>
              <option value="burnaby">Burnaby</option>
              <option value="coquitlam">Coquitlam</option>
              <option value="northvan">North Van</option>
              <option value="westvan">West Van</option>
          </select>
        </div>
       

      </div>

        <Button className="btn-search" 
          style={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <NavLink to="/landing" className="nav-search">Submit</NavLink>
        </Button>

      </div>
    </body>
  );
}