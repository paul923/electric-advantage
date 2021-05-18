import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import background from "../images/background.jpg";
import carImage from "../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { getVehicleSearchResult } from "../api/VehicleAPI";

const SearchResult = (props) => {
  const cardInfo = [
    /* GET SEARCHED CARS HERE */
    {
      // onLoadGetVehicleSearchResult()
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
    {
      image: carImage,
      make: "Tesla",
      model: "Model 3",
      trim: "Trim",
      odometer: "30,000km",
      color: "White",
      year: "2020",
      price: "$40,000",
    },
  ];

  const makeID = props.location.state.makeInput;
  const range = props.location.state.rangeInput;
  const price = props.location.state.priceInput;
  const condition = props.location.state.conditionIDInput;
  const lat = props.location.state.latInput;
  const long = props.location.state.longInput;

  // console.log("SEARCH RESULTS:" + searchResults["MakeID"]);

  async function onLoadGetVehicleSearchResult() {
    let resultSearch = await getVehicleSearchResult(
      makeID,
      range,
      price,
      condition,
      lat,
      long
    );

    setCarCards(
      resultSearch["body"].map((car) => {
        return {
          image: carImage,
          make: car["MakeID"],
          model: car["ModelID"],
          trim: car["Trim"],
          odometer: car["Odometer"],
          color: car["ColorID"],
          year: car["Year"],
          price: car["StartPrice"],
        };
      })
    );
  }

  React.useEffect(() => {
    onLoadGetVehicleSearchResult();
  }, []);

  const [carCards, setCarCards] = React.useState([]);

  // image: carImage,
  // make: "Tesla",
  // model: "Model 3",
  // trim: "Trim",
  // odometer: "30,000km",
  // color: "White",
  // year: "2020",
  // price: "$40,000",

  // resultSearch.map((car) => {
  //   console.log(
  //     "ABC" +
  //       {
  //         image: carImage,
  //         make: car["MakeID"],
  //         model: car["ModelID"],
  //         trim: car["Trim"],
  //         odemeter: car["Odometer"],
  //         color: car["ColorID"],
  //         year: car["Year"],
  //         price: car["StartPrice"],
  //       }
  //   );
  // });

  // console.log("CARCARD:" + carCards);

  const renderCard = (card, index) => {
    {
      // console.log("MakeID: " + { makeID });
    }
    return (
      <div className="carCard">
        <img src={card.image} className="carImage" />

        <Table striped hover className="carTable">
          <tbody>
            <tr>
              <td>Make: {card.make}</td>
              <td>Model: {card.model}</td>
              <td>Trim: {card.trim}</td>
            </tr>
            <tr>
              <td colSpan="2">Odometer: {card.odometer}</td>
              <td>Color: {card.color}</td>
            </tr>
            <tr>
              <td colSpan="2">Vehicle Year: {card.year}</td>
              <td>Price: {card.price}</td>
            </tr>
          </tbody>
        </Table>

        <Button className="carDetailsButton">
          <NavLink to="/search-detail" className="nav-search">
            Details
          </NavLink>
        </Button>
      </div>
    );
  };

  return (
    <body>
      <h2>Search Result</h2>
      <Button className="emailAlertButton">Send Email Alert</Button>
      <div className="results"> {carCards.map(renderCard)} </div>
    </body>
  );
};

export default SearchResult;
