import React from "react";
import { Form, Table, Button } from "react-bootstrap";
import "../css/dealersAddPage.css";
import DealerAddInventoryRow from "../../components/DealerAddInventoryRow";

export default function DealerAddList() {
  const [carsToAdd, setCarsToAdd] = React.useState([]);

  let car1 = {
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "b",
    carPrice: 999,
    Qty: 99,
  };
  let car2 = {
    carMake: "Honda",
    carModel: "Civic",
    carTrim: "A",
    carPrice: 99,
    Qty: 10,
  };
  let car3 = {
    carMake: "Mercedes",
    carModel: "CLS",
    carTrim: "C",
    carPrice: 50,
    Qty: 89,
  };
  let car4 = {
    carMake: "Volkswagen",
    carModel: "Jetta",
    carTrim: "Q",
    carPrice: 150,
    Qty: 2,
  };
  let car5 = {
    carMake: "BMW",
    carModel: "X1",
    carTrim: "z",
    carPrice: 1,
    Qty: 28,
  };
  let car6 = {
    carMake: "Porsche",
    carModel: "Taycan",
    carTrim: "abcd",
    carPrice: 999,
    Qty: 0,
  };
  let car7 = {
    carMake: "Mercedes",
    carModel: "CLA",
    carTrim: "M",
    carPrice: 99,
    Qty: 16,
  };
  let car8 = {
    carMake: "Toyota",
    carModel: "Corolla",
    carTrim: "P",
    carPrice: 100,
    Qty: 36,
  };
  let car9 = {
    carMake: "BMW",
    carModel: "X3",
    carTrim: "O",
    carPrice: 342,
    Qty: 43,
  };

  let listOfCars = [car1, car2, car3, car4, car5, car6, car7, car8, car9];

  return (
    <div>
      <h2>Add To Inventory</h2>
      <hr />
      <div className="tableCustomize">
        <Table bordered>
          <thead>
            <tr>
              <th className="tableHeaders">Model</th>
              <th className="tableHeaders">Make</th>
              <th className="tableHeaders">Trim</th>
              <th className="tableHeaders">Price</th>
              <th className="tableHeaders">Qty</th>
              <th className="tableHeaders">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {listOfCars.map((car) => (
              <DealerAddInventoryRow
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
      <div className="bottomDiv">
        <Button className="bottomButtons">Add All to Inventory </Button>
        <Button className="bottomButtons">Add More Cars</Button>
      </div>
    </div>
  );
}
