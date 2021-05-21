import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import "../css/dealersAddPage.css";
import DealerAddInventoryRow from "../../components/DealerAddInventoryRow";
import DealerAddCarModal from "../../components/DealerAddCarModal";

export default function DealerAddList() {
  const [carsToAdd, setCarsToAdd] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [addList, setAddList] = React.useState([]);

  /**
   * Add bulk of vehicles to inventory database.
   * @param {
   *        [{"VehicleID": string,
   *         "DealershipID": string,
   *         "ColorID": string,
   *         "ConditionID": int,
   *         "StartPrice": float,
   *         "Odometer": float,
   *         "Quantity" : int}]
   *        } vehicleArray
   * @returns message string
   */
  const addToDatabase = () => {};

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
