import React from "react";
import { Button } from "reactstrap";
import { FaTrash } from "react-icons/fa";

function ButtonDelete() {
  return (
    <Button color="danger">
      <FaTrash size={20}/>
    </Button>
  );
}

export default ButtonDelete;
