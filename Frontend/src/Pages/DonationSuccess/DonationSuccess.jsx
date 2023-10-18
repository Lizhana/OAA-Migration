import { useEffect } from "react";
import styles from "./DonationSuccess.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const DonationSuccess = () => {
  const location = useLocation();
  const donation = JSON.parse(window.sessionStorage.getItem("donation"));
  const id = new URLSearchParams(location.search).get("preference_id");

  const handlePostDonation = async () => {
    try {
      const postDonation = {
        ...donation,
        id
      }
      await axios.post(`donations/success`, postDonation);
      window.sessionStorage.removeItem("donation");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handlePostDonation();
  }, [id])

  return (
    <div className={styles.containerSuccess}>
      <div className={styles.successMessage}>
        <h2>¡Gracias por tu donación!</h2>
        <p>Tu compromiso nos ayuda a hacer una diferencia real en el mundo.</p>
        <Link to="/" className="button green-button">INICIO</Link>
      </div>
    </div>
  )
}

export default DonationSuccess