import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilFill, XCircleFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const DealerAddInventoryRow = ({
  carModel,
  carMake,
  carTrim,
  carPrice,
  Qty,
  car,
  carsToAdd,
  setCarsToAdd,
}) => {
  const deleteHandler = (e) => {
    setCarsToAdd(carsToAdd.filter((row) => row !== car));
  };
  return (
    <tr>
      <td>{carModel}</td>
      <td>{carMake}</td>
      <td>{carTrim}</td>
      <td>{carPrice}</td>
      <td>{Qty}</td>
      <td className="lastColumn">
        <div>
          <Button variant="light">
            <PencilFill />
          </Button>
          <Button
            onClick={deleteHandler}
            variant="light"
            className="edt-dlt-buttons"
          >
            <XCircleFill />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default DealerAddInventoryRow;
