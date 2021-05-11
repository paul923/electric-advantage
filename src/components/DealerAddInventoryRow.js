import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const addInventoryRow = ({ carModel, carMake, carTrim, carPrice, Qty }) => {
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
        <Button className="editIcon" variant="light">
          <PencilFill />
        </Button>
      </td>
    </tr>
  );
};

export default addInventoryRow;
