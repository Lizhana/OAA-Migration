import React, { useState } from "react";
import logo from "../../assets/forum/natSom.webp";
import { Link, useNavigate } from "react-router-dom";
import Style from "./foro.module.css";
import Alert from "../Alerts/AlertDevelopment";

export default function OurWorkCards({ allWorks }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = (work) => {
    if (work?.isFinished) {
      navigate(`/nuestro-trabajo/${work._id}`);
    } else {
      setAlertMessage(` Esta informacion se encuentra en desarrollo...`);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={Style.cardContainers}>
      <span>
        <h2 className={Style.h2cardContainers } >Conflictos y causas ambientales:</h2>
      </span>
      {allWorks &&
        allWorks.map((work) => {
          return (
            <>
              <div key={work?._id} className={Style.divContainerC}  >
                <button onClick={() => handleClick(work)} className={Style.buttoncardContainers} >
                  <h5 className={Style.h5cardContainers } >{work?.titleMain}</h5>
                  <div className={Style.divSecondCard} >
                    <img src={logo} alt="imagen" width="50px" className={Style.imgdivContainerC} />
                    <p className={Style.textcardContainers} > Conoce más acerca de {work?.titleMain} </p>
                  </div>
                </button> 
                {showAlert && !work.isFinished  && (
                <Alert message={alertMessage} onClose={handleCloseAlert} />
              )}
              </div>
            </>
          );
        })} 
    </div>
  );
}
