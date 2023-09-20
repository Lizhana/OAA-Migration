import React from "react";
import { Link } from "react-router-dom";
import Styles from "./SameCategories.module.css";

export default function SameCategories({ threeCategories }) {
  return (
    <div className={Styles.divContainer}>
      <div className={Styles.titleContainer}>
        <h4 className={Styles.titleNewRecomended}>Te puede interesar</h4>
      </div>
      <div className={Styles["map-container"]}>
        {threeCategories?.map((category) => {
          return (
            <div key={category?._id} className={Styles["container-extras"]}>
              <Link to={`/noticia/${category?._id}`} className={Styles["link"]}>
                <div className={Styles["image-container"]}>
                  <img
                    src={category?.image[0]?.url}
                    alt="Noticia"
                    className={Styles["image-notiextra"]}
                  />
                </div>
                <div className={Styles["introduction-container"]} >
                  <p className={Styles["introduction-news"]}>
                    {category?.titleMain.length > 50
                      ? category?.titleMain.substring(0, 50) + "..."
                      : category?.titleMain}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
