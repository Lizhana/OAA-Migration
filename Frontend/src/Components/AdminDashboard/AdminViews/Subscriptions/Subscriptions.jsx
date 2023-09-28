import Banner from "../../AdminComponents/Banner/Banner";
import AdminNavBar from "../../AdminComponents/Navbar/AdminNavBar";
import Stats from "../../AdminComponents/Stats/Stats";
import Table from "../../AdminComponents/Table/Table";
import style from "./Subscriptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearOneSubscription, deleteSubscription, getOneSubscription, getSubscriptions, subscriptionsFilters } from "../../../../stateManagement/actions/panelAdmin/subscriptions.actions";
import { useNavigate } from "react-router-dom";
import { syncCurrentState} from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";

function Subscriptions () {
  const { subscriptions, filters } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

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
        subscriptionsFilters({
          ...filters,
          order: "oldest"
        })
      )
    } else {
      dispatch(
        subscriptionsFilters({
          ...filters,
          order: "latest"
        })
      )
    }
  }

  const handleNameFilter = () => {
    if (filters.order === "a-z") {
      dispatch(
        subscriptionsFilters({
          ...filters,
          order: "z-a",
        })
      );
    } else {
      dispatch(
        subscriptionsFilters({
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
    dispatch(getSubscriptions());
  }, []);

  useEffect(() => {
    dispatch(syncCurrentState(cleanedArray(subscriptions)));
  }, [subscriptions]);

  return (
    <div className={style.MetaContainer}>
      <Banner />
      <div className={style.MainContainer}>
        <AdminNavBar />
        <div className={style.StatsContainer}>
          <div className={style.ButtonsContainer}>
          </div>
          {
            subscriptions ?
              <Table columns={[
                {name: "Id", filter: false}, 
                {name: "Fecha", filter: true},
                {name: "Nombre", filter: true},
              ]} data={cleanedArray(subscriptions)} listener={listener} />
              :
              <h1>No hay nada</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
