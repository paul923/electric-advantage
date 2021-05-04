import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
<<<<<<< HEAD:src/pages/HomePage.js
import SignUpModal from "../components/SignUpModal";
=======
import background from "../images/background.jpg";
import { Button } from "react-bootstrap";
>>>>>>> homepage / search page created and logo added:src/pages/Home.js

export default function Home() {

  return (
    <div>
      <img src={background} alt="background" className="background"/>
      <h2>Search for a Vehicle</h2>

      <ul>
        <li>Price</li>
        <li>Range</li>
        <li>Make</li>
        <li>Model</li>
        <li>Trim</li>
        <li>Postal Code</li>
      </ul>
    
      <ul>
        <li>
            <select className="price-dropdown">
              <option value="20000">$20,000</option>
              <option value="40000">$40,000</option>
              <option value="60000">$60,000</option>
              <option value="80000">$80,000</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
            </select> 
        </li>

        <li>
          <select className="range-dropdown">
            <option value="200km">200km</option>
            <option value="300km">300km</option>
            <option value="400km">400km</option>
            <option value="500km">500km</option>
            <option value="600km">600km</option>
          </select>
        </li>


        <li>
          <select className="make-dropdown">
            <option value="tesla">Tesla</option>
            <option value="porshce">Porsche</option>
            <option value="ford">Ford</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="bmw">BMW</option>
          </select>
        </li>
        <li>
          <select className="model-dropdown">
          <option value="tesla">Model S</option>
          <option value="taycan">Taycan</option>
          <option value="mustang">Mustang</option>
          <option value="bolt">Bolt EV</option>
          <option value="e-golf">E-Golf</option>
          <option value="i3">i3</option>
          </select>
        </li>
        <li>
          <select className="trim-dropdown">
            <option value="trim1">Trim 1</option>
            <option value="trim2">Trim 2</option>
            <option value="trim3">Trim 3</option>
            <option value="trim4">Trim 4</option>
            <option value="trim5">Trim 5</option>
          </select>
        </li>
        <li>
          <input type="text" className="postal"></input>
        </li>
      </ul>

      <Button className="btn-search" 
        style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        Search
      </Button>

    </div>
  );
}
