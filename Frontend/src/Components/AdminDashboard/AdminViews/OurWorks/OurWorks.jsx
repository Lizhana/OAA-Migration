import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./OurWorks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearOneWork, deleteWork, editWorkForm, getOneWork, getOurWorks, ourWorksFilters } from "../../../../stateManagement/actions/panelAdmin/ourWorks.actions";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";

function OurWorks () {
  const { ourWorks, filters } = useSelector((state) => state.ourWorks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Función para editar un elemento:
  const editHandler = (_, id) => {
    dispatch(getOneWork(id));
    dispatch(editWorkForm(true));
    navigate("/panel-admin/our-works-form");
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    dispatch(editWorkForm(false));
    navigate("/panel-admin/our-works-form");
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteWork(id));
    dispatch(clearOneWork());
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
        ourWorksFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        ourWorksFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleCategoryFilter = () => {
    if (filters.category === "all") {
      dispatch(
        ourWorksFilters({
          ...filters,
          category: "Imagen",
        })
      );
    } else if (filters.category === "Imagen") {
      dispatch(
        ourWorksFilters({
          ...filters,
          category: "Video",
        })
      );
    } else if (filters.category === "Video") {
      dispatch(
        ourWorksFilters({
          ...filters,
          category: "all",
        })
      );
    }
  };

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        ourWorksFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        ourWorksFilters({
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
    dispatch(getOurWorks());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(ourWorks)));
  }, [ourWorks]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
            <Stats createHandler={createHandler} text="Crear nuevo Trabajo" type= "create" />
          </div>
          {
            ourWorks ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Título", filter: true},
              ]} data={cleanedArray(ourWorks)} listener={listener} editHandler={editHandler} deleteHandler={deleteHandler}/>
              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default OurWorks;
