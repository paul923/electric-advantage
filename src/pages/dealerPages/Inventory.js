import React from "react";
import { Table, Button } from "react-bootstrap";
import "../css/dealersInventory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronExpand } from "react-bootstrap-icons";
import InventoryRow from "../../components/DealerInventoryRow";
import InventoryHeader from "../../components/DealerInventoryHeader";
import { Link } from "react-router-dom";
import DealerEditCarModal from "../../components/DealerEditModal";

export default function DealerInventory() {
  /* DUMMY DATA WITH DUMMY FIELDS */
  let car1 = {
    carID: 1,
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "b",
    carYear: 2021,
    carColor: "black",
    carPrice: 999,
    Qty: 99,
  };
  let car2 = {
    carID: 2,
    carMake: "Honda",
    carModel: "Civic",
    carTrim: "A",
    carYear: 2019,
    carColor: "silver",
    carPrice: 99,
    Qty: 10,
  };
  let car3 = {
    carID: 3,
    carMake: "Mercedes",
    carModel: "CLS",
    carTrim: "C",
    carYear: 2001,
    carColor: "white",
    carPrice: 50,
    Qty: 89,
  };
  let car4 = {
    carID: 4,
    carMake: "Volkswagen",
    carModel: "Jetta",
    carTrim: "Q",
    carYear: 2018,
    carColor: "grey",
    carPrice: 150,
    Qty: 2,
  };
  let car5 = {
    carID: 5,
    carMake: "BMW",
    carModel: "X1",
    carTrim: "z",
    carYear: 2021,
    carColor: "black",
    carPrice: 1,
    Qty: 28,
  };
  let car6 = {
    carID: 6,
    carMake: "Porsche",
    carModel: "Taycan",
    carTrim: "abcd",
    carYear: 2011,
    carColor: "blue",
    carPrice: 999,
    Qty: 0,
  };
  let car7 = {
    carID: 7,
    carMake: "Mercedes",
    carModel: "CLA",
    carTrim: "M",
    carYear: 2022,
    carColor: "white",
    carPrice: 99,
    Qty: 16,
  };
  let car8 = {
    carID: 8,
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "P",
    carYear: 2002,
    carColor: "red",
    carPrice: 100,
    Qty: 36,
  };
  let car9 = {
    carID: 9,
    carMake: "BMW",
    carModel: "X3",
    carTrim: "O",
    carYear: 2015,
    carColor: "grey",
    carPrice: 342,
    Qty: 43,
  };

  let listOfCars = [car1, car2, car3, car4, car5, car6, car7, car8, car9];
  /* END OF DUMMY DATA */

  const [inventory, setInventory] = React.useState(listOfCars);
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

  function search(listOfCars) {
    return listOfCars.filter(
      (car) =>
        car.carModel.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carMake.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carTrim.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.carPrice.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
        car.Qty.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  React.useEffect(() => {
    setFilteredList(search(inventory));
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
                  onClick={() => sortNumber("Qty")}
                >
                  <ChevronExpand />
                </Button>
              </th>
              {/* <th className="tableHeaders"> </th> */}
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
                Qty={car.Qty}
                carID={car.carID}
                row={car}
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
