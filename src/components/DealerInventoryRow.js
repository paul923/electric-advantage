import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { XCircleFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { deleteItemByInventoryID } from "../api/DealershipAPI";

const InventoryRow = ({
  carModel,
  carMake,
  carTrim,
  carYear,
  carColor,
  carPrice,
  Qty,
  editText,
  rowID,
  updateInventory,
  showEditText,
  row,
}) => {
  async function onDeleteHandler() {
    let deleteResponse = await deleteItemByInventoryID(rowID);
    let deleteStatus = deleteResponse.status;
    if (deleteStatus == 200) {
      updateInventory();
    }
  }

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
      <td className="lastColumn">
        <Button
          onClick={() => {
            onDeleteHandler();
          }}
          className="editIcon"
          variant="light"
        >
          <XCircleFill />
        </Button>
      </td>{" "}
      {/* <DealerEditCarModal
        rowCarModel={carModel}
        rowCarMake={carMake}
        rowCarTrim={carTrim}
        rowCarPrice={carPrice}
        rowCarQty={Qty}
        showModal={showModal}
        setShowModal={setShowModal}
      />  */}
    </tr>
  );
};

export default InventoryRow;
