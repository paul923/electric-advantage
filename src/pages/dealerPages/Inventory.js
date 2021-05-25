import React from "react";
import { Table, Button } from "react-bootstrap";
import "../css/dealersInventory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronExpand } from "react-bootstrap-icons";
import InventoryRow from "../../components/DealerInventoryRow";
import InventoryHeader from "../../components/DealerInventoryHeader";
import { Link } from "react-router-dom";
import {
  getInventoryByDealershipID,
  updateDealershipInventoryItems,
} from "../../api/DealershipAPI";
import { useAuth } from "../../components/AuthContext";
import { getColors } from "../../api/VehicleAPI";

export default function DealerInventory() {
  const [retrievedInventory, setRetrievedInventory] = React.useState([]);
  const { currentUser, userObject } = useAuth();
  const [colorList, setColorList] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState("");
  const [colorDictionary, setColordictioanry] = React.useState([]);
  const [inventoryToUpdate, setInventoryToUpdate] = React.useState([]);

  async function getFirstInventoryList() {
    // let firstInventory = await getInventoryByDealershipID(userObject.UserID);
    let firstInventory = await getInventoryByDealershipID("1");
    let statusCode = firstInventory.status;
    if (statusCode === 200) {
      let body = firstInventory.body;
      setRetrievedInventory(
        body.map((car) => {
          return {
            carModel: car.ModelName,
            carTrim: car.Trim,
            carMake: car.MakeName,
            carYear: car.Year,
            carColor: car.ColorID,
            carQty: car.Quantity,
            carPrice: car.StartPrice,
            carCondition: `${car.ConditionID === 1 ? "New" : "Used"}`,
            inventoryID: car.InventoryID,
          };
        })
      );
    } else if (statusCode === 404) {
      setRetrievedInventory([]);
      alert(`Error ${statusCode}. ${firstInventory.error}.`);
    } else {
      alert(`Status : ${statusCode}. ${firstInventory.error}.`);
    }
  }

  React.useEffect(() => {
    // getColorsList();
    getFirstInventoryList();
  }, []);

  React.useEffect(() => {
    setFilteredList(retrievedInventory);
  }, [retrievedInventory]);

  // async function getColorsList() {
  //   let resultColorList = await getColors();
  //   let statusCode = resultColorList.status;
  //   if (statusCode === 200) {
  //     let body = resultColorList.body;
  //     console.log(body);
  //     setColorList(
  //       body.map((colorObject) => {
  //         setSelectedColor(colorObject.ColorID);
  //         return {
  //           selectedColor: colorObject.colorName,
  //         };
  //       })
  //     );
  //   } else {
  //     alert(`Status : ${statusCode}, ${resultColorList.error}.`);
  //   }
  // }

  // function getColor(colorID) {
  //   let filtered = colorList.filter(
  //     (colorObject) => colorObject.ColorID === colorID
  //   );
  //   return filtered[0].ColorName;
  // }

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
        car.carTrim.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carCondition.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carYear.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carModel.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carMake.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carPrice.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carColor.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carQty.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  async function editHandler() {
    let apiResponse = await updateDealershipInventoryItems(
      inventoryToUpdate,
      "1"
    );
    let statusCode = apiResponse.status;
    if (statusCode === 200) {
      getFirstInventoryList();
      setInventoryToUpdate([]);
    } else {
      alert(`${statusCode}. ${apiResponse.error}`);
    }
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
                headerName="Car Make"
                sortHandler={() => sortString("carMake")}
              />
              <InventoryHeader
                headerName="Car Model"
                sortHandler={() => sortString("carModel")}
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
                headerName="Condition"
                sortHandler={() => sortNumber("carCondition")}
              />
              <InventoryHeader
                headerName="Price"
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
                carTrim={car.carTrim}
                carYear={car.carYear}
                carColor={car.carColor}
                carPrice={car.carPrice}
                carCondition={car.carCondition}
                Qty={car.carQty}
                inventoryID={car.inventoryID}
                updateInventory={getFirstInventoryList}
                editText={editText}
                showEditText={showEditText}
                inventoryToUpdate={inventoryToUpdate}
                setInventoryToUpdate={setInventoryToUpdate}
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
          className={`${!editText ? "hiddenUntilEdit" : ""} bottomButtons`}
          onClick={() => showEditText(!editText)}
        >
          <text>Edit</text>
          {/* <text className={`${editText ? "hiddenUntilEdit" : ""} bottomButtons`}>Update</text> */}
        </Button>
        <Button
          className={`${editText ? "hiddenUntilEdit" : ""} bottomButtons`}
          onClick={() => {
            showEditText(!editText);
            editHandler();
          }}
        >
          {/* <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>Edit</text> */}
          <text>Update</text>
        </Button>
      </div>
    </div>
  );
}
