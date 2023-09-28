import style from "./Banner.module.css";
import logo from "../../../../assets/logo-temporal-2.png";
import { useSelector } from "react-redux";

function Banner () {
  const { admin } = useSelector((state) => state.admin);
  return (
    <div className={style.Banner}>
      <div>
        <img src={logo} alt="no c"/>
        <h1>Panel de Administrador</h1>
      </div>
      <h2>Hola, {admin ? admin: "Administrador"}</h2>
    </div>
  )
}

export default Banner;
