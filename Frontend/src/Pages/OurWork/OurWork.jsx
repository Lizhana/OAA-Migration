import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorKs } from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import OurWorkCards from "../../Components/OurWorkComponents/OurWorkCards";
import ForoIntroduction from "../../Components/OurWorkComponents/ForoIntroduction";
import Styles from "../../Components/OurWorkComponents/foro.module.css";

export default function OurWork() {
  const dispatch = useDispatch();
  const { allWorks, onlyAWork } = useSelector((state) => state?.newsDetail);

  useEffect(() => {
    dispatch(getAllWorKs());
  }, []);

  return (
    <div className={Styles.divContainerOne}>
      <div  >
      <ForoIntroduction />
      <OurWorkCards allWorks={allWorks} />
      </div>
    </div>
  );
}
