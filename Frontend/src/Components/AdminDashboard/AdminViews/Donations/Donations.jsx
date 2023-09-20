import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Donations.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearOneDonation, deleteDonations, donationsFilter, getDonations } from "../../../../stateManagement/actions/panelAdmin/donations.actions";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";

function Donations () {
  const { donations, filters } = useSelector((state) => state.donations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Funcion para eliminar un elemento:
  const deleteHandler = (id) => {
    dispatch(deleteDonations(id));
    dispatch(clearOneDonation());
  };

  const cleanedArray = (info) => {
    return info.map((element) => {
      return {
        id: element.id,
        fecha: element.createdAt.split("T")[0],
        amount: element.amount,
        iso: element.iso
      }
    });
  };


  const handleDateFilter = () => {
    if(filters.order === "latest") {
      dispatch(
        donationsFilter({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        donationsFilter({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleIsoFilter = () => {
    if ( filters.iso === "ARS") {
      dispatch (
        donationsFilter({
          ...filters,
          iso: "USD"
        })
      )
    }
    if(filters.iso === "USD") {
      dispatch(
        donationsFilter({
          ...filters,
          iso:"all"
        })
      )
    }
    if(filters.iso === "all") {
      dispatch(
        donationsFilter({
          ...filters,
          iso:"ARS"
        })
      )
    }
  }

  const handleAmountFilter = () => {
    if(filters.order === "higher") {
      dispatch(
        donationsFilter({
          ...filters,
          order: "lower"
        })
      )
    } else {
      dispatch(
        donationsFilter({
          ...filters,
          order: "higher"
        })
      )
    }
  }


  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        donationsFilter({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        donationsFilter({
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
      case "Iso":
        handleIsoFilter();
        break;
      case "Cantidad":
        handleAmountFilter();
        break;
    }
  };

  useEffect(() => {
    dispatch(getDonations());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(donations)));
  }, [donations]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
          </div>
          {
            donations ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Cantidad", filter: true},
                {name: "Iso", filter: true}
              ]} data={cleanedArray(donations)} listener={listener} deleteHandler={deleteHandler}/>

              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Donations;
