import { NavLink, useNavigate } from "react-router-dom";
import style from "./AdminNavBar.module.css";
import { useDispatch } from "react-redux";
import { loaderOff, loaderOn } from "../../../../stateManagement/actions/loader/loader.actions";
import { logoutAdmin } from "../../../../stateManagement/actions/panelAdmin/admin.actions";

function AdminNavBar () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(loaderOn());
    dispatch(logoutAdmin());
    dispatch(loaderOff());
    navigate("/login");
  };
  return (
    <nav className={style.Container}>
      <div>
        <NavLink
          to="/panel-admin/donaciones" 
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Donaciones
        </NavLink>

        <NavLink 
          to="/panel-admin/suscripciones"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Suscripciones
        </NavLink>

        <NavLink to="/panel-admin/publicaciones"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Publicaciones
        </NavLink>

        <NavLink to="/panel-admin/nuestros-trabajo"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Nuestro trabajo
        </NavLink>

        <NavLink to="/panel-admin/radio"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Programa de Radio
        </NavLink>

        <NavLink to="/panel-admin/galeria"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar" : isActive ? "activeBar" : ""
          }
        >
          Galería
        </NavLink>

        <NavLink to="/panel-admin/admins"
          className={({isActive, isPending}) =>
            isPending ? "pendingBar": isActive ? "activeBar": ""
          }
        >
          Administradores
        </NavLink>
      </div>

      <div>
        <NavLink>Cambiar contraseña</NavLink>
        <button onClick={logoutHandler} type="button">Cerrar Sesión</button>
      </div>
    </nav>
  )
}

export default AdminNavBar;
