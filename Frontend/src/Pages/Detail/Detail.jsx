import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewDetail } from "../../stateManagement/actions/panelAdmin/news.actions";
import {
  threNewsCategory,
  threNewsRecentAction,
} from "../../stateManagement/actions/newsDetailActions/newsDetailActions";

// Components
import DetailNew from "../../Components/DetailNew/DetailNew";
import DetailNewsletter from "../../Components/DetailRight/Newsletter/Newsletter";
import SameCategories from "../../Components/DetailRight/SameCategories/SameCategories";
import RecentNews from "../../Components/DetailRight/RecentNews/RecentNews";

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
    <div className={styles["detail-container"]}>
      <div className={styles["detail-left"]}>
        <DetailNew newDetail={newDetail} />
      </div>
      <div className={styles["detail-right"]}>
        <DetailNewsletter />
        <SameCategories threeCategories={threeCategories} />
        <RecentNews threeRecents={threeRecents} />
      </div>
    </div>
  );
}
