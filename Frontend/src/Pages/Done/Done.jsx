import { useState } from 'react';
import styles from './Done.module.css';
import axios from 'axios';
import { dataCountries } from "../../utils/helpers/dataExtra"
import { toast } from 'sonner';

export default function Done() {
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
    country: "",
    publicDonation: true,
  });

  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(donationData.amount);

  const handleChange = event => {
    const { name, value } = event.target;

    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length > 2) return;

    setDonationData({
      ...donationData,
      [name]: name === "amount" ? numericValue : value
    })
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/donations", donationData);
      window.sessionStorage.setItem("donation", JSON.stringify(donationData));
      window.location.href = data;
    } catch (error) {
      toast.error("Faltan completar campos obligatorios");
      toast.dismiss();
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.FormDone}>
      <h1 className={styles.TitleDone}>APOYANOS</h1>
      <p className={styles.TextDone}>Sumate a nuestra lucha por un ambiente sano y sostenible. Tu donación amplía nuestro alcance y hace posible el campio real. Hacé una diferencia hoy mismo.</p>
      <input className={styles.InputAmount} onChange={handleChange} value={donationData.amount} type="text" name="amount" maxLength="15" placeholder="Ingrese el monto en pesos argentinos" />
      <p className={styles.FormattedAmount}>Monto a donar: {formattedAmount}</p>
      <input className={styles.InputDone} onChange={handleChange} value={donationData.name} type="text" name="name" placeholder="Nombre Completo o Razón Social" />
      <input className={styles.InputDone} onChange={handleChange} value={donationData.email} type="email" name="email" placeholder="Email" />
      <p className={styles.TextDone}>¿Desea aparecer públicamente como donante?</p>
      <label className={styles.LabelDone}>
        <input type="radio" name="publicDonation" onChange={handleChange} value={true} defaultChecked /> Sí
      </label>
      <label className={styles.LabelDone}>
        <input type="radio" name="publicDonation" onChange={handleChange} value={false} /> No
      </label>
      <select className={styles.SelectCountry} value={donationData.country} onChange={handleChange} name="country">
        <option value="" disabled>Selecciona tu país</option>
        {dataCountries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <button className={styles.BtnDone} type="submit">Donar</button>
    </form>
  );
};