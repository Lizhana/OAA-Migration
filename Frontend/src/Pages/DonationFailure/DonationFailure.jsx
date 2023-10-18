import styles from './DonationFailure.module.css';
import { Link } from "react-router-dom";

const DonationFailure = () => {
  return (
    <div className={styles.containerFailure}>
      <div className={styles.failureMessage}>
        <h2>¡No se pudo realizar la donación!</h2>
        <p>Hubo un problema al procesar tu donación. Por favor, inténtalo nuevamente más tarde.</p>
        <Link to="/" className="button green-button">INICIO</Link>
      </div>
    </div>
  );
}

export default DonationFailure;
