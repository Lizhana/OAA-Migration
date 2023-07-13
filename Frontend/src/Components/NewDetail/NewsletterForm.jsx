import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToNewsletter } from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import Styles from "./inscription.module.css";

export default function FormNewsletter() {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUserToNewsletter(newUser));
    setNewUser({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.formLetter}>
      <div className={Styles["div-form"]}>
        <h4>Recibe las noticias mas destacadas</h4>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          placeholder="Nombre"
          onChange={handleChange}
          className={Styles.inputInscription}
        />
        <input
          type="email"
          id="email"
          name="email"
          value={newUser.email}
          placeholder="Correo Electronico"
          onChange={handleChange}
          className={Styles.inputInscription}
        />
        <input type="submit" value="Suscribete" className={Styles.submitBtn} />
      </div>
    </form>
  );
}
