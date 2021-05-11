import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const InventoryRow = ({ carModel, carMake, carTrim, carPrice, Qty, carID }) => {
  return (
    <tr>
      <td>{carModel}</td>
      <td>{carMake}</td>
      <td>{carTrim}</td>
      <td>{carPrice}</td>
      <td>{Qty}</td>
      <td className="lastColumn">
        <Button className="editIcon" variant="light">
          <PencilFill />
        </Button>
      </td>
    </tr>
  );
};

export default InventoryRow;
