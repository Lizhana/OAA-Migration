import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hiddenMessage } from "../../stateManagement/actions/alerts/alertWindow.actions";
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import styles from "./AlertWindow.module.css";

export default function AlertWindow() {
  const dispatch = useDispatch(),
    messageState = useSelector((state) => state.alert),
    { success, error, className } = messageState;

  useEffect(() => {
    setTimeout(function () {
      dispatch(hiddenMessage());
    }, 5000);
  }, [className]);

  return (
    <div className={`${styles["container"]} ${styles[className]}`}>
      {success && (
        <div className={styles["success"]}>
          <FcCheckmark size='1.25rem' />
          <p className={styles["success-text"]}>{success}</p>
        </div>
      )}
      {error && (
        <div className={styles["error"]}>
          <FcHighPriority size='1.25rem' />
          <p className={styles["error-text"]}>{error}</p>
        </div>
      )}
    </div>
  );
}
