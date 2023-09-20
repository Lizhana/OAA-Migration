import { Link } from "react-router-dom";
import style from "./Stats.module.css";

function Stats ({createHandler, type, text, data}) {
  return (
    <>
      {type === "create" ?
        <button onClick={createHandler} className={style.link}>
          <div  className={`${style.Container} ${style.CreateContainer}`}>
            <h1>+</h1>
            <h2>{text}</h2>
          </div>
        </button>
        :
        <div className={style.Container}>
          <h1>{data}</h1>
          <h2>{text}</h2>
        </div>
      }
    </>
  )
}

export default Stats;
