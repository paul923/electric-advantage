import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import DealerEditCarModal from "./DealerEditModal";

const InventoryRow = ({
  carModel,
  carMake,
  carTrim,
  carYear,
  carColor,
  carPrice,
  Qty,
  editText,
  showEditText,
  row,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <tr>
      <td>{carModel}</td>
      <td>{carMake}</td>
      <td>{carTrim}</td>
      <td>{carYear}</td>
      <td>{carColor}</td>
      <td>
        <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>
          {carPrice}
        </text>
        <input
          type="text"
          className={`inputsCell ${editText ? "hiddenUntilEdit" : ""}`}
          placeholder={carPrice}
        ></input>
      </td>
      <td>
        <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>{Qty}</text>
        <input
          type="text"
          className={`inputsCell ${editText ? "hiddenUntilEdit" : ""}`}
          placeholder={Qty}
        ></input>
      </td>
      {/* <td className="lastColumn">
        <Button
          onClick={() => setShowModal(true)}
          className="editIcon"
          variant="light"
        >
          <PencilFill />
        </Button>
      </td> */}
      <DealerEditCarModal
        rowCarModel={carModel}
        rowCarMake={carMake}
        rowCarTrim={carTrim}
        rowCarPrice={carPrice}
        rowCarQty={Qty}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </tr>
  );
};

export default InventoryRow;
