import React from "react";
import { Form, Table, Button } from "react-bootstrap";
import "../css/adminInventory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronExpand } from "react-bootstrap-icons";
import InventoryRow from "../../components/InventoryRow";
import InventoryHeader from "../../components/InventoryHeader";

export default function Home() {
  let car1 = {
    carMake: "Toyota",
    carModel: "Toyota",
    carTrim: "Toyota",
    carPrice: 999,
    Qty: 99,
  };
  let car2 = {
    carMake: "Civic",
    carModel: "Civic",
    carTrim: "Civic",
    carPrice: 99,
    Qty: 10,
  };
  let car3 = {
    carMake: "Benz",
    carModel: "Benz",
    carTrim: "Benz",
    carPrice: 50,
    Qty: 89,
  };

  let listOfCars = [car1, car2, car3];

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

  const [inventory, setInventory] = React.useState(listOfCars);
  const [filteredList, setFilteredList] = React.useState([]);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    setFilteredList(search(inventory));
  }, [query]);

  return (
    <div>
      <h2>Inventory</h2>
      <hr />
      <input
        type="text"
        placeholder="Search..."
        className="InventorySearchBar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table bordered hover search>
        <thead>
          <tr>
            <InventoryHeader headerName="Car Model" />
            <InventoryHeader headerName="Car Make" />
            <InventoryHeader headerName="Car Trim" />
            <InventoryHeader headerName="Car Price" />
            <th className="tableHeaders">
              Qty{" "}
              <Button variant="light" className="headerButtons">
                <ChevronExpand />
              </Button>
            </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((car) => (
            <InventoryRow
              carModel={car.carModel}
              carMake={car.carMake}
              carTrim={car.carTrim}
              carPrice={car.carPrice}
              Qty={car.Qty}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
