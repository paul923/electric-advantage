import React from "react";
import { Table, Button } from "react-bootstrap";
import "../css/dealersInventory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronExpand } from "react-bootstrap-icons";
import InventoryRow from "../../components/DealerInventoryRow";
import InventoryHeader from "../../components/DealerInventoryHeader";
import { Link } from "react-router-dom";
import { getInventoryByDealershipID } from "../../api/DealershipAPI";

export default function DealerInventory() {
  const [retrievedInventory, setRetrievedInventory] = React.useState([]);

  async function getFirstInventoryList() {
    let firstInventory = await getInventoryByDealershipID("1");
    let statusCode = firstInventory.status;
    if (statusCode === 200) {
      let body = firstInventory.body;
      setRetrievedInventory(
        body.map((car) => {
          return {
            carModel: car.ModelName,
            carTrim: car.Odometer,
            carMake: car.MakeName,
            carYear: car.Year,
            carColor: car.ColorID,
            carQty: car.Quantity,
            carPrice: car.StartPrice,
            rowID: car.InventoryID,
          };
        })
      );
    } else if (statusCode === 404) {
      setRetrievedInventory([]);
      alert(`Dealer has empty inventory!`);
    } else {
      alert(`Status : ${statusCode}.`);
    }
  }

  React.useEffect(() => {
    getFirstInventoryList();
  }, []);

  React.useEffect(() => {
    setFilteredList(retrievedInventory);
  }, [retrievedInventory]);

  const [filteredList, setFilteredList] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [reverse, setReverse] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editText, showEditText] = React.useState(true);

  function sortNumber(sortBy) {
    const copy = [...filteredList];
    copy.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return 1;
      }
      return 0;
    });
    setReverse(!reverse);
    if (reverse) {
      copy.reverse();
    }
    setFilteredList(copy);
  }

  function sortString(sortBy) {
    const copy = [...filteredList];
    copy.sort((a, b) => {
      if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
        return -1;
      }
      if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setReverse(!reverse);
    if (reverse) {
      copy.reverse();
    }
    setFilteredList(copy);
  }

  function search(retrievedInventory) {
    return retrievedInventory.filter(
      (car) =>
        car.carModel.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carMake.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carPrice.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carQty.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  React.useEffect(() => {
    setFilteredList(search(retrievedInventory));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="InventorySearchBar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="tableCustomize">
        <Table bordered hover search>
          <thead>
            <tr>
              <InventoryHeader
                headerName="Car Model"
                sortHandler={() => sortString("carModel")}
              />
              <InventoryHeader
                headerName="Car Make"
                sortHandler={() => sortString("carMake")}
              />
              <InventoryHeader
                headerName="Car Trim"
                sortHandler={() => sortString("carTrim")}
              />
              <InventoryHeader
                headerName="Car Year"
                sortHandler={() => sortNumber("carYear")}
              />
              <InventoryHeader
                headerName="Car Color"
                sortHandler={() => sortString("carColor")}
              />
              <InventoryHeader
                headerName="Car Price"
                sortHandler={() => sortNumber("carPrice")}
              />
              <th className="tableHeaders">
                Qty{" "}
                <Button
                  variant="light"
                  className="headerButtons"
                  onClick={() => sortNumber("carQty")}
                >
                  <ChevronExpand />
                </Button>
              </th>
              <th className="tableHeaders">Delete</th>
            </tr>
          </thead>
          <tbody className="body">
            {filteredList.map((car) => (
              <InventoryRow
                carModel={car.carModel}
                carMake={car.carMake}
                carTrim={car.carYear}
                carYear={car.carYear}
                carColor={car.carColor}
                carPrice={car.carPrice}
                Qty={car.carQty}
                rowID={car.rowID}
                updateInventory={getFirstInventoryList}
                // row={car}
                setShowModal={setShowModal}
                editText={editText}
                showEditText={showEditText}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="bottomDiv">
        <Link className="buttonToAddList" to="/addList">
          <Button className="bottomButtons">Add Cars</Button>
        </Link>
        <Button
          className="bottomButtons"
          onClick={() => showEditText(!editText)}
        >
          <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>Edit</text>
          <text className={`${editText ? "hiddenUntilEdit" : ""}`}>Update</text>
        </Button>
      </div>
    </div>
  );
}
