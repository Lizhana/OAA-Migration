import { useSelector } from "react-redux";

import styles from "./Loader.module.css";

export default function Loader() {
  const loaderState = useSelector((state) => state.loader),
    { loader } = loaderState;

  return (
    <div className={`${loader} ${styles["container"]}`}>
      <div className={` ${styles["loader"]}`}></div>
    </div>
  );
}
