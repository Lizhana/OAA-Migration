import React, { useEffect } from "react";
import styles from "../Detail/Detail.module.css";
import SameCategories from "../../Components/NewDetail/SameCategorie";
import DetailNew from "../../Components/NewDetail/DetailNew";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewDetail } from "../../stateManagement/actions/panelAdmin/news.actions";
import {
  threNewsCategory,
  threNewsRecentAction,
} from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import RecentNews from "../../Components/NewDetail/RecentNews";

export default function Detail() {
  const { id } = useParams(),
    dispatch = useDispatch(),
    { newDetail } = useSelector((state) => state.news);
  const { threeCategories, threeRecents } = useSelector(
    (state) => state?.newsDetail
  );

  useEffect(() => {
    if (Object.keys(newDetail).length === 0 || newDetail._id !== id) {
      dispatch(getNewDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (newDetail.category) {
      dispatch(threNewsCategory(newDetail.category));
      dispatch(threNewsRecentAction());
    }
  }, [dispatch, newDetail.category]);


  return (
    <div className={styles["container-parent"]}>
      <DetailNew newDetail={newDetail} />
      <SameCategories threeCategories={threeCategories} />
      <RecentNews threeRecents={threeRecents} />
    </div>
  );
}
