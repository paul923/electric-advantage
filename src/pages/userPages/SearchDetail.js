import React from "react";
import carImage from "../../images/tesla.jpg";
import "../css/searchDetails.css";
import { Card } from "react-bootstrap";
import { getInventoryByInventoryID } from "../../api/VehicleAPI";
import queryString from "query-string";

const SearchDetail = ({ match }) => {
  const [item, setItem] = React.useState("");

  React.useEffect(() => {
    onLoadGetInventoryItem();
  }, []);

  async function onLoadGetInventoryItem() {
    let result = await getInventoryByInventoryID(match.params.inventoryID);
    console.log(result);
    if (result.status === 200) {
      setItem(result.body[0]);
    } else {
      alert(result.error);
    }
  }

  return (
    <body>
      <div>
        <div className="test">
          <h1>Details</h1>
        </div>

        <div className="carDetailsWithImage">
          <img
            src={carImage}
            alt="carDetailsImage"
            className="carDetailsImage"
          />

          <div className="carDetails">
            <h4>Make</h4>
            <h4>Model</h4>
            <h4>Price</h4>
            <h4>Range</h4>
            <h4>Trim</h4>
            <h4>Color</h4>
          </div>

          <div className="carSpecific">
            <h4>{item.MakeName}</h4>
            <h4>{item.ModelName}</h4>
            <h4>${item.StartPrice}</h4>
            <h4>{item.EVRange}km</h4>
            <h4>{item.Trim}</h4>
            <h4>{item.ColorName}</h4>
          </div>

          <div className="additionalInfo">
            <h3>Find It Here</h3>

            <Card className="infoCard">
              <div>{item.GroupName}</div>
              <div>{item.SalesContact}</div>
              <div>{item.SalesEmail}</div>
              <div>{item.SalesPhone}</div>
            </Card>
          </div>
        </div>
      </div>
    </body>
  );
};

export default SearchDetail;
