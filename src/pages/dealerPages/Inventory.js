import React from "react";
import { Form, Table, Button } from "react-bootstrap";
import "../css/dealersInventory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronExpand } from "react-bootstrap-icons";
import InventoryRow from "../../components/DealerInventoryRow";
import InventoryHeader from "../../components/DealerInventoryHeader";
import { Link } from "react-router-dom";

export default function DealerInventory() {
  /* DUMMY DATA WITH DUMMY FIELDS */
  let car1 = {
    carID: 1,
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "b",
    carPrice: 999,
    Qty: 99,
  };
  let car2 = {
    carID: 2,
    carMake: "Honda",
    carModel: "Civic",
    carTrim: "A",
    carPrice: 99,
    Qty: 10,
  };
  let car3 = {
    carID: 3,
    carMake: "Mercedes",
    carModel: "CLS",
    carTrim: "C",
    carPrice: 50,
    Qty: 89,
  };
  let car4 = {
    carID: 4,
    carMake: "Volkswagen",
    carModel: "Jetta",
    carTrim: "Q",
    carPrice: 150,
    Qty: 2,
  };
  let car5 = {
    carID: 5,
    carMake: "BMW",
    carModel: "X1",
    carTrim: "z",
    carPrice: 1,
    Qty: 28,
  };
  let car6 = {
    carID: 6,
    carMake: "Porsche",
    carModel: "Taycan",
    carTrim: "abcd",
    carPrice: 999,
    Qty: 0,
  };
  let car7 = {
    carID: 7,
    carMake: "Mercedes",
    carModel: "CLA",
    carTrim: "M",
    carPrice: 99,
    Qty: 16,
  };
  let car8 = {
    carID: 8,
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "P",
    carPrice: 100,
    Qty: 36,
  };
  let car9 = {
    carID: 9,
    carMake: "BMW",
    carModel: "X3",
    carTrim: "O",
    carPrice: 342,
    Qty: 43,
  };

  let listOfCars = [car1, car2, car3, car4, car5, car6, car7, car8, car9];
  /* END OF DUMMY DATA */

  const [inventory, setInventory] = React.useState(listOfCars);
  const [filteredList, setFilteredList] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [reverse, setReverse] = React.useState(false);

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
              <th className="tableHeaders"> </th>
            </tr>
          </thead>
          <tbody className="body">
            {filteredList.map((car) => (
              <InventoryRow
                carModel={car.carModel}
                carMake={car.carMake}
                carTrim={car.carTrim}
                carPrice={car.carPrice}
                Qty={car.Qty}
                carID={car.carID}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="bottomDiv">
        <Link className="buttonToAddList" to="/addList">
          <Button className="bottomButtons">Add Cars</Button>
        </Link>
        <Button className="bottomButtons">Remove</Button>
      </div>
    </div>
  );
}
