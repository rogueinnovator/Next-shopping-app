import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import noteContext from "../context/notes/noteContext";
const Alerts = () => {
  const context = useContext(noteContext);
  const { alert } = context;

  return (
    <div>
      {" "}
      <Alert key="primary " variant={alert.type}>
        {alert.msg}
      </Alert>
    </div>
  );
};

export default Alerts;
