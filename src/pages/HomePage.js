import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import SignUpModal from "../components/SignUpModal";
import background from "../images/background.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <body>
      <div>
        <img src={background} alt="background" className="background" />
        <h2>Choose Region</h2>
        <div className="homeContent">
          <div className="countryColumn">
            <div className="countryTitle">
              <h3>Country</h3>
            </div>

            <select className="country-dropdown">
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
              <option value="korea">Korea</option>
              <option value="mexico">Mexico</option>
              <option value="germany">Germany</option>
              <option value="spain">Spain</option>
            </select>
          </div>

          <div className="provinceColumn">
            <div className="provinceTitle">
              <h3>Province</h3>
            </div>

            <select className="province-dropdown">
              <option value="britishcolumbia">British Columbia</option>
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

          <div className="regionColumn">
            <div className="regionTitle">
              <h3>Region</h3>
            </div>

            <select className="region-dropdown">
              <option value="vancouver">Vancouver</option>
              <option value="burnaby">Burnaby</option>
              <option value="coquitlam">Coquitlam</option>
              <option value="northvan">North Van</option>
              <option value="westvan">West Van</option>
            </select>
          </div>
        </div>

        <Button className="btn-submit">
          <NavLink to="/landing" className="nav-search">
            Submit
          </NavLink>
        </Button>
      </div>
    </body>
  );
}
