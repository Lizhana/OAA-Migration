import React from "react";
import Styles from "./alertDevelopment.module.css"


const Alert = ({ message, onClose }) => {
  return (
    <div >
      <div className={Styles["alert-box"]}>
        <p>{message}</p>
        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};

export default Alert;
