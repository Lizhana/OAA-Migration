import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Radio.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";
import { clearOneRadioProgram, deleteRadioProgram, editRadioProgram, editRadioProgramForm, getRadioProgram, oneRadioProgram, radioProgramFilters } from "../../../../stateManagement/actions/panelAdmin/radioProgram.actions";

function Radio () {
  const { radioProgram, filters } = useSelector((state) => state.radioProgram);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Función para editar un elemento:
  const editHandler = (_, id) => {
    dispatch(oneRadioProgram(id));
    dispatch(editRadioProgramForm(true));
    navigate("/panel-admin/radio-program-form");
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    dispatch(clearOneRadioProgram());
    dispatch(editRadioProgramForm(false));
    navigate("/panel-admin/radio-program-form");
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteRadioProgram(id));
  };

  const cleanedArray = (info) => {
    return info.map((element) => {
      return {
        id: element.id,
        createdAt: element.createdAt.split("T")[0],
        titleMain: element.titleMain,
      }
    });
  };


  const handleDateFilter = () => {
    if(filters.order === "latest") {
      dispatch(
        radioProgramFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        radioProgramFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        radioProgramFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        radioProgramFilters({
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
      case "Título":
        handleNameFilter();
        break;
    }
  };

  useEffect(() => {
    dispatch(getRadioProgram());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(radioProgram)));
  }, [radioProgram]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
            <Stats createHandler={createHandler} text="Crear nuevo Programa" type= "create" />
          </div>
          {
            radioProgram ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Título", filter: true},
              ]} data={cleanedArray(radioProgram)} listener={listener} editHandler={editHandler} deleteHandler={deleteHandler}/>

              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Radio;
