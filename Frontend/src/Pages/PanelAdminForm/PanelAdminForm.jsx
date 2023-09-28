import React from "react";
import { useParams } from "react-router-dom";
import Error404 from "../Error404/Error404";
import { useSelector } from "react-redux";
import EditFormPublications from "../../Components/AdminDashboard/AdminViews/EditForm/EditFormPublications/EditFormPublications";
import EditFormRadioPrograms from "../../Components/AdminDashboard/AdminViews/EditForm/EditFormRadioPrograms/EditFormRadioPrograms";
import EditFormOurWorks from "../../Components/AdminDashboard/AdminViews/EditForm/EditFormOurWorks/EditFormOurWorks";
import EditFormAdmins from "../../Components/AdminDashboard/AdminViews/EditForm/EditFormAdmins/EditFormAdmins";
import EditFormGallery from "../../Components/AdminDashboard/AdminViews/EditForm/EditFormGallery/EditFormGallery";

export default function PanelAdminForm() {
  const { form } = useParams(),
    { admin } = useSelector((state) => state.admin);

  return (
    <>
      {form !== "gallery-form" &&
        form !== "our-works-form" &&
        form !== "administrators-form" &&
        form !== "publications-form" &&
        form !== "radio-program-form" && <Error404 />}
      {form === "gallery-form" && <EditFormGallery />}
      {form === "our-works-form" && <EditFormOurWorks/>}
      {form === "publications-form" && <EditFormPublications/>}
      {form === "radio-program-form" && <EditFormRadioPrograms />}
      {form === "administrators-form" && <EditFormAdmins/>}

    </>
  );
}
