import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAWorkById } from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import WorkDetailComponent from "../../Components/OurWorkComponents/WorkDetail";

export default function WorkDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { onlyAWork, allWork } = useSelector((state) => state?.newsDetail);

  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: { toolbar: false },
  });

  useEffect(() => {
    dispatch(getAWorkById(id));
  }, [id]);

  return (
    <div>
      <WorkDetailComponent onlyAWork={onlyAWork} quillRef={quillRef} />
    </div>
  );
}
