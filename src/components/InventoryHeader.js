import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { ChevronExpand } from "react-bootstrap-icons";

const InventoryHeader = ({ headerName }) => {
  return (
    <th className="tableHeaders">
      {headerName}{" "}
      <Button variant="light" className="headerButtons">
        <ChevronExpand />
      </Button>
    </th>
  );
};

export default InventoryHeader;
