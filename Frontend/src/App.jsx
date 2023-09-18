import axios from "axios";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AlertWindow from "./Components/Alerts/AlertWindow";
import { Toaster } from "sonner";
import AboutUs from "./Pages/AboutUs/AboutUs";

import ActiveCases from "./Pages/ActiveCases/ActiveCases";
import Communities from "./Pages/Communities/Communities";
import Detail from "./Pages/Detail/Detail";
import Done from "./Pages/Done/Done";
import Error404 from "./Pages/Error404/Error404";
import Gallery from "./Pages/Gallery/Gallery";
import Honorific from "./Pages/Honorific/Honorific";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Loader from "./Components/Loader/Loader";
import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin";
import NaturalezaSomos from "./Pages/NaturalezaSomos/NaturalezaSomos";
import NavBar from "./Components/NavBar/NavBar";
import Novelties from "./Pages/Novelties/Novelties";
import OurWork from "./Pages/OurWork/OurWork";
import PanelAdmin from "./Pages/PanelAdmin/PanelAdmin";
import PanelAdminForm from "./Pages/PanelAdminForm/PanelAdminForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import SocialForum from "./Pages/OurWork/SocialForum";
import WorkDetail from "./Pages/OurWork/WorkDetail";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname]);

  return (
    <>
      <Loader />
      <NavBar />
      <AlertWindow />
      <Toaster richColors closeButton position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/novelties" element={<Novelties />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/naturalezaSomos" element={<NaturalezaSomos />} />
        <Route path="/done" element={<Done />} />
        <Route path="/activeCases" element={<ActiveCases />} />
        <Route path="/honorific" element={<Honorific />} />        
        <Route path="/noticia/:id" element={<Detail />} />
        <Route path="/nuestro-trabajo" element={<OurWork />} />
        <Route path="/nuestro-trabajo/:id" element={<WorkDetail />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/foro/primer-foro-social" element={<SocialForum />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/panel-admin" element={<PanelAdmin />} />
          <Route path="/panel-admin/:form" element={<PanelAdminForm />} />
        </Route>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
