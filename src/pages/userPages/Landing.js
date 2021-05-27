import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/landing.css";
import {
  getDealershipsInventoryCountingsByRegion,
  getCountingsList,
} from "../../api/MiscAPI";
import SearchBar from "../../components/SearchBar";
import carImage1 from "../../images/kia.jpg";
import { Table } from "react-bootstrap";

export default function LandingPage() {
  const [countings, setCountings] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState([]);

  React.useEffect(() => {
    onLoadGetCountingsList();
  }, []);

  async function onLoadGetCountingsList() {
    let resultCountList = await getCountingsList();
    let statusCode = resultCountList.status;
    if (statusCode === 200) {
      let body = resultCountList.body;
      setCountings(body);
      setSelectedRegion(body[0]);
    } else {
      alert(`Status : ${statusCode}, ${resultCountList.error}`);
    }
  }

  const renderCard = (card, index) => {
    return (
      <div className="dealerCard">
        <div className="dealerImageContainer">
          <img src={card.image} className="dealerImage" />
        </div>

        <Table striped hover className="dealerTable">
          <tbody>
            <tr>
              <td>{card.name}</td>
              <td className="inventory">Inventory: {card.number}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  const cardInfo = [
    { image: carImage1, name: "Downtown Kia", number: "50" },
    { image: carImage2, name: "Brian Jessel Downtown", number: "37" },
    { image: carImage3, name: "Jim Pattison Downtown", number: "2" },
    { image: carImage4, name: "Ford Downtown", number: "28" },
  ];

  return (
    <body>
      <div className="regionContainer">
        <select
          className="regionSelect"
          onChange={(e) => {
            setSelectedRegion(JSON.parse(e.target.value));
          }}
        >
          {countings.map((region) => {
            return (
              <option className="optionText" value={JSON.stringify(region)}>
                {region.RegionName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="banner">
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.DealershipCount}
          </div>
          <div className="category">Dealerships</div>
        </div>
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.UsedCount}
          </div>
          <div className="category">New Cars</div>
        </div>
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.NewCount}
          </div>
          <div className="category">Used Cars</div>
        </div>
      </div>

      <div className="dealerResults">
        <h2 style={{ color: "#207567", fontSize: "22pt" }}>
          Top 4 Dealerships in your Region
        </h2>
        {cardInfo.map(renderCard)}
      </div>

      <SearchBar />
    </body>
  );
}
