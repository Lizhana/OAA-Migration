import style from "./Searchbar.module.css";
import icon from "../../../../assets/lupa.png";
import { useState } from "react";

function SearchBar ({handleSearch, data, handleOnChange}) {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  const handleOnKeyDown = (event) => {
    if(event.key === "Enter") {
      console.log(event.key)
      handleSearch(input)
    }
  }

  return (
    <div className={style.Container}>
      {
      handleOnChange ? 
      <div>
        <span>Mostrar:</span>
        <select
          name="status"
          onChange={handleOnChange}   
          id="status"
        >
          <option value="active">{data.first}</option>
          <option value="inactive">{data.second}</option>
        </select>

      </div>
      : <div></div>
      }

      {
        handleSearch ?
        <div className={style.SearchBar}>
          <input onKeyDown={handleOnKeyDown} onChange={handleInputChange} type="search" placeholder="Buscar..."/> 
          <button onClick={() => handleSearch(input)}>
            <img src={icon}/>
          </button>
        </div>
        : null

      }
    </div>
  )
}

export default SearchBar;
