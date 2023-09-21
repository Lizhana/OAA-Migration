import style from "./Table.module.css";
import trashIcon from "../../../../assets/basura.png";
import editIcon from "../../../../assets/lapiz.png";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Pagination from "../../../Pagination/Pagination";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { queryCurrentState, cleanCurrentQuery } from "../../../../stateManagement/actions/panelAdmin/currentWorkingState.actions";


function Table(props) {
  const dispatch = useDispatch();
  

  const data = useSelector((state) => state.currentWorkingState.currentData);
  const [currentPage, setCurrentPage] = useState(1)

  // Props
  const editHandler = props.editHandler;
  const deleteHandler = props.deleteHandler;
  const headers = props.columns;
  const listener = props.listener;
  const objData = data && data.length > 0 ? Object.keys(data[0]) : [];
  
  //variables de paginación
  const numberPerPage = 7
  const initialIndex = numberPerPage * (currentPage - 1)
  const finalIndex = initialIndex + numberPerPage;

  //elementos a mostar en cada paginacion
  const itemsPerPage = data.slice(initialIndex, finalIndex);


  //query
  const handleSearch = (query) => {
    if (query !== "") {
      dispatch(queryCurrentState(query));
    } else {
      dispatch(cleanCurrentQuery());
    }
    setCurrentPage(1);
  }
  

  return (
    <>
      <SearchBar data={{
        first: "Archivos activos",
        second: "Archivos inactivos"
      }} 
        handleSearch={handleSearch}/>

      <table className={style.Table}>
        <thead>
          <tr>
            {headers.map((element, index) => {
              if (element.filter) {
                return (
                  <th key={index}>
                    {element.name}
                    <MdOutlineKeyboardArrowDown
                      className="white-icon"
                      size="1.45rem"
                      onClick={() => listener(element.name)}
                    />
                  </th>
                );
              } else {
                return <th key={index}>{element.name}</th>;
              }
            })}
            {editHandler || deleteHandler ? <th>Acciones</th> : null}
          </tr>
        </thead>


        <tbody>
          {data && data.length > 0 ? (
            itemsPerPage.map((row) => (
              <tr key={row.id}>
                {objData.map((header, index) => (
                  <td key={index}>{row[header]}</td>
                ))}
                <td className={style.ActionContainer}>
                  {editHandler && (
                    <button type="button" onClick={(event) => editHandler(event, row.id)}>
                      <img src={editIcon} alt="Edit" />
                    </button>
                  )}
                  {deleteHandler && (
                    <button type="button" onClick={() => deleteHandler(row.id)}>
                      <img src={trashIcon} alt="Delete" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : null}
        </tbody>

      </table>
      <Pagination
        numberOfItems={data.length}
        numberPerPage={numberPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Table;

