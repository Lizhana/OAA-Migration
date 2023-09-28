import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Gallery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createGallery, editGalleryForm, getGalleries, getOneGallery, galleryFilters, deleteGallery, clearOneGallery} from "../../../../stateManagement/actions/panelAdmin/gallery.actions";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";

function Gallery () {
  const { galleries, filters } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Función para editar un elemento:
  const editHandler = (_, id) => {
    dispatch(getOneGallery(id));
    dispatch(editGalleryForm(true));
    navigate("/panel-admin/gallery-form");
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    dispatch(editGalleryForm(false));
    navigate("/panel-admin/gallery-form");
  };

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteGallery(id));
    dispatch(clearOneGallery());
  };

  const cleanedArray = (info) => {
    return info.map((element) => {
      return {
        id: element.id,
        createdAt: element.createdAt.split("T")[0],
        titleMain: element.titleMain,
        categories: element.categories
      }
    });
  };


  const handleDateFilter = () => {
    if(filters.order === "latest") {
      dispatch(
        galleryFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        galleryFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleCategoryFilter = () => {
    if (filters.category === "all") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "Imagen",
        })
      );
    } else if (filters.category === "Imagen") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "Video",
        })
      );
    } else if (filters.category === "Video") {
      dispatch(
        galleryFilters({
          ...filters,
          category: "all",
        })
      );
    }
  };

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        galleryFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        galleryFilters({
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
      case "Categoría":
        handleCategoryFilter();
        break;
    }
  };

  useEffect(() => {
    dispatch(getGalleries());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(galleries)));
  }, [galleries]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
            <Stats createHandler={createHandler} link="gallery-image-form" text="Crear nueva Galería" type= "create" />
          </div>
          {
            galleries ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Título", filter: true},
                {name: "Categoría", filter:true}
              ]} data={cleanedArray(galleries)} listener={listener} editHandler={editHandler} deleteHandler={deleteHandler}/>

              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Gallery;
