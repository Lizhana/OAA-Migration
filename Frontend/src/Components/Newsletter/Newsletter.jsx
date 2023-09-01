import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserToNewsletter } from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import Styles from "./Newsletter.module.css";

export default function FormNewsletter() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={Styles.fondoModalNewsletter} style={{ display: active ? "flex" : "none" }} onClick={() => setActive(false)}>
      </div>
      <form onSubmit={handleSubmit} style={{ display: active ? "flex" : "none" }} className={Styles.formNewsletter}>
        <button className={Styles.closeBtn} onClick={() => setActive(false)} type="button">X</button>
        <h4>Recibe las noticias mas destacadas</h4>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          placeholder="Nombre Completo"
          onChange={handleChange}
          className={Styles.inputInscription}
        />
        <input
          type="email"
          id="email"
          name="email"
          value={newUser.email}
          placeholder="Correo Electrónico"
          onChange={handleChange}
          className={Styles.inputInscription}
        />
        <button type="submit" className={Styles.submitBtn}>Suscribete</button>
      </form>
    </>
  );
}
