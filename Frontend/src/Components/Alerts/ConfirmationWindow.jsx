import { useDispatch, useSelector } from "react-redux";
import { confirmationClose } from "../../stateManagement/actions/alerts/confirmationWindow.actions";
import styles from "./ConfirmationWindow.module.css";

export default function ConfirmationWindow({
  text,
  aceptParams,
  cancelParams,
}) {
  const dispatch = useDispatch(),
    confirmationState = useSelector((state) => state.confirmation),
    { confirmationWindow, message, acept, cancel } = confirmationState;

  const cancelHandler = (event) => {
    event.preventDefault();
    typeof cancel === "function" && cancel(cancelParams);
    dispatch(confirmationClose());
  };
  const acceptHandler = (event) => {
    event.preventDefault();
    acept(aceptParams);
    dispatch(confirmationClose());
  };
  return (
    <div className={`${styles["container"]} ${styles[confirmationWindow]}`}>
      <p>{message ? message : text}</p>
      <div className='button-container'>
        <button className='button red-button' onClick={cancelHandler}>
          Cancelar
        </button>
        <button className='button green-button' onClick={acceptHandler}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
