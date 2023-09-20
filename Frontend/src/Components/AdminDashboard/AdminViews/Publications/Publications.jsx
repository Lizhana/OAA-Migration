import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Publications.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearNewDetail, deleteNew, editNewForm, getAllNews, getNewDetail, newsFilters } from "../../../../stateManagement/actions/panelAdmin/news.actions";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";

function Publications () {
  const { news, filters } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Función para editar un elemento:
  const editHandler = (_, id) => {
    dispatch(getNewDetail(id));
    dispatch(editNewForm(true));
    navigate("/panel-admin/publications-form");
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    dispatch(editNewForm(false));
    navigate("/panel-admin/publications-form");
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteNew(id));
    dispatch(clearNewDetail());
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
        newsFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        newsFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        newsFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        newsFilters({
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
    dispatch(getAllNews());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(news)));
  }, [news]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
            <Stats createHandler={createHandler} link="gallery-image-form" text="Crear nueva Publicación" type= "create" />
          </div>
          {
            news ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Título", filter: true},
              ]} data={cleanedArray(news)} listener={listener} editHandler={editHandler} deleteHandler={deleteHandler}/>
              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Publications;
