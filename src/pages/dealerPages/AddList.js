import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import "../css/dealersAddPage.css";
import DealerAddInventoryRow from "../../components/DealerAddInventoryRow";
import DealerAddCarModal from "../../components/DealerAddCarModal";
import { addInventoryItemToDealership } from "../../api/DealershipAPI";
import { getInventoryByDealershipID } from "../../api/DealershipAPI";
// import { useAuth } from "../../components/AuthContext";
// import { getVehicleSearchResult } from "../../api/DealershipAPI";

export default function DealerAddList() {
  const [carsToAdd, setCarsToAdd] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [addList, setAddList] = React.useState([]);
  // const { currentUser, userObject } = useAuth();

  React.useEffect(() => {
    addToDatabaseHandler();
  }, [carsToAdd]);

  React.useEffect(() => {
    addToDatabaseHandler();
  }, [carsToAdd]);

  const addToDatabaseHandler = () => {
    setAddList(
      carsToAdd.map((car) => {
        return {
          VehicleID: car.vehicleID,
          DealershipID: "1",
          ColorID: car.carColor,
          ConditionID: parseInt(car.carCondition),
          StartPrice: parseFloat(car.carPrice),
          Odometer: parseFloat(car.Odo),
          Quantity: parseInt(car.Qty),
        };
      })
    );
  };

  async function insertIntoDatabaseHandler() {
    let apiResponse = await addInventoryItemToDealership(addList);
    let statusCode = apiResponse.status;
    if (statusCode === 500) {
      alert(`${statusCode}. ${apiResponse.error}.`);
    }
    if (statusCode === 400) {
      alert(`${statusCode}. ${apiResponse.error}.`);
    }
  }

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
              <th className="tableHeaders smallColumns"></th>
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
        <Button
          onClick={() => {
            insertIntoDatabaseHandler();
            // addInventoryItemToDealership(addList);
            console.log(addList);
            setCarsToAdd([]);
          }}
          className="bottomButtons"
        >
          Add All to Inventory{" "}
        </Button>
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
