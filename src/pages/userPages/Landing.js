import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/landing.css";
import { getMakeList } from "../../api/VehicleAPI";
import { getRegionsList, getCountingsList } from "../../api/MiscAPI";
import SearchBar from "../../components/SearchBar";
import carImage1 from "../../images/kia.jpg";
import carImage2 from "../../images/bmw.jpg";
import carImage3 from "../../images/jp.jpg";
import carImage4 from "../../images/ford.jpg";
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
          <div className="value">{selectedRegion.DealershipCount}</div>
          <div className="category">Dealerships</div>
        </div>
        <div className="countBox">
          <div className="value" style={{ fontSize: "45pt" }}>
            {selectedRegion.UsedCount}
          </div>
          <div className="category">New Cars</div>
        </div>
        <div className="countBox">
          <div className="value">{selectedRegion.NewCount}</div>
          <div className="category">Used Cars</div>
        </div>
      </div>

      <div className="dealerResults">
        <h2 style={{ color: "#207567" }}>Top 4 Dealerships in your Region</h2>
        {cardInfo.map(renderCard)}
      </div>

      <SearchBar />
      {/* <Row>
        <Col>
          <div className="makeColumn">
            <div className="makeTitle">
              <h3>Make</h3>
            </div>

            <select
              className="make-dropdown"
              onChange={(e) => {
                let carMakeObject = JSON.parse(e.target.value);
                setMakeID(carMakeObject.MakeID);
                setMakeName(carMakeObject.MakeName);
              }}
            >
              {makeList.map((make) => (
                <option value={JSON.stringify(make)}>{make.MakeName}</option>
              ))}
            </select>
          </div>
        </Col>

        <Col>
          <div className="statusColumn">
            <div className="statusTitle">
              <h3>Status</h3>
            </div>

            <select
              className="status-dropdown"
              onChange={(e) => setConditionID(e.target.value)}
            >
              <option value={parseInt("1", 10)}>New</option>
              <option value={parseInt("2", 10)}>Used</option>
            </select>
          </div>
        </Col>

        <Col>
          <section className="range">
            <div className="priceColumn">
              <div className="priceTitle">
                <h3>Price</h3>
              </div>

              <Container>
                <RangeSlider
                  max={250000}
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  variant="success"
                />
              </Container>
            </div>
          </section>
        </Col>

        <Col>
          <section className="range">
            <div className="rangeColumn">
              <div className="rangeTitle">
                <h3 className="">Range</h3>
              </div>

              <Container>
                <RangeSlider
                  max={1000}
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                  variant="success"
                />
              </Container>
            </div>
          </section>
        </Col>

        <Col>
          <a
            href={`/search-result?make=${makeID}&status=${conditionID}&price=${priceValue}&range=${rangeValue}&lat=${lat}&lng=${long}`}
          >
            <Button className="searchButton">Search</Button>
          </a>
        </Col>
      </Row> */}
    </body>
  );
}
