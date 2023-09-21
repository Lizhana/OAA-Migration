import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Admins.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";
import { administratorsFilters, deleteAdministrator, getAllAdministrators, getOneAdministrator } from "../../../../stateManagement/actions/panelAdmin/administrators.actions";

function Admins () {
  const { administrators, filters } = useSelector((state) => state.administrators);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Función para editar un elemento:
  const editHandler = (_, id) => {
    dispatch(getOneAdministrator(id));
    //dispatch(editGalleryForm(true));
    navigate("/panel-admin/administrators-form");
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    //dispatch(editAdminsForm(false));
    navigate("/panel-admin/administrators-form");
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteAdministrator(id));
  };

  const cleanedArray = (info) => {
    return info.map((element) => {
      return {
        id: element.id,
        createdAt: element.createdAt.split("T")[0],
        name: element.name,
      }
    });
  };


  const handleDateFilter = () => {
    if(filters.order === "latest") {
      dispatch(
        administratorsFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        administratorsFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        administratorsFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        administratorsFilters({
          ...filters,
          order: "a-z",
        })
      );
    }
  }

  const listener = (name) => {
    switch (name) {
      case "Fecha":
        handleDateFilter();
        break;
      case "Nombre":
        handleNameFilter();
        break;
    }
  };

  useEffect(() => {
    dispatch(getAllAdministrators());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(administrators)));
  }, [administrators]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
          </div>
          {
            administrators ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Nombre", filter: true},
              ]} data={cleanedArray(administrators)} listener={listener} editHandler={editHandler} deleteHandler={deleteHandler}/>

              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Admins;
