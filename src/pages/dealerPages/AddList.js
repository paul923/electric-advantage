import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import "../css/dealersAddPage.css";
import DealerAddInventoryRow from "../../components/DealerAddInventoryRow";
import DealerAddCarModal from "../../components/DealerAddCarModal";

export default function DealerAddList() {
  const [carsToAdd, setCarsToAdd] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

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

  // const addCarsHandler = (
  //   carMakeInput,
  //   carModelInput,
  //   carTrimInput,
  //   qtyInput,
  //   priceInput,
  //   colorInput,
  //   infoInput,
  //   imagesInput,
  //   carID
  // ) => {
  //   setCarsToAdd([
  //     ...carsToAdd,
  //     {
  //       carMake: carMakeInput,
  //       carModel: carModelInput,
  //       carTrim: carTrimInput,
  //       qtyInput: qtyInput,
  //       price: priceInput,
  //       color: colorInput,
  //       info: infoInput,
  //       images: imagesInput,
  //       carID: carID,
  //     },
  //   ]);
  // };

  return (
    <div>
      <h2>Add To Inventory</h2>
      <hr />
      <div className="tableCustomize">
        <Table bordered>
          <thead>
            <tr>
              <th className="tableHeaders mediumColumns">Make</th>
              <th className="tableHeaders bigColumns">Vehicle</th>
              <th className="tableHeaders mediumColumns">Price</th>
              <th className="tableHeaders mediumColumns">Odo</th>
              <th className="tableHeaders smallColumns">Qty</th>
              <th className="tableHeaders smallColumns">Color</th>
              <th className="tableHeaders smallColumns">Condition</th>
              <th className="tableHeaders mediumColumns"></th>
            </tr>
          </thead>
          <tbody>
            {carsToAdd.map((car) => (
              <DealerAddInventoryRow
                carModel={car.carModel}
                carMake={car.carMake}
                Odo={car.Odo}
                carPrice={car.carPrice}
                Qty={car.Qty}
                carColor={car.carColor}
                carCondition={car.carCondition}
                carVehicle={car.carVehicle}
                car={car}
                carsToAdd={carsToAdd}
                setCarsToAdd={setCarsToAdd}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="bottomDiv">
        <Button className="bottomButtons">Add All to Inventory </Button>
        <Button onClick={() => setShowModal(true)} className="bottomButtons">
          Add More Cars
        </Button>
      </div>
      <DealerAddCarModal
        showModal={showModal}
        setShowModal={setShowModal}
        setCarsToAdd={setCarsToAdd}
        carsToAdd={carsToAdd}
      />
    </div>
  );
}
