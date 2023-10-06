import axios from "axios";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AlertWindow from "./Components/Alerts/AlertWindow";
import { Toaster } from "sonner";
import AboutUs from "./Pages/AboutUs/AboutUs";

import ActiveCases from "./Pages/ActiveCases/ActiveCases";
import Communities from "./Pages/Communities/Communities";
import Detail from "./Pages/Detail/Detail";
import Done from "./Pages/Done/Done";
import DonationSuccess from "./Pages/DonationSuccess/DonationSuccess";
import DonationFailure from "./Pages/DonationFailure/DonationFailure";
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
import GalleryAdmin from "./Components/AdminDashboard/AdminViews/Gallery/Gallery";
import Donations from "./Components/AdminDashboard/AdminViews/Donations/Donations";
import Subscriptions from "./Components/AdminDashboard/AdminViews/Subscriptions/Subscriptions";
import Publications from "./Components/AdminDashboard/AdminViews/Publications/Publications";
import OurWorks from "./Components/AdminDashboard/AdminViews/OurWorks/OurWorks";
import Radio from "./Components/AdminDashboard/AdminViews/Radio/Radio";
import Admins from "./Components/AdminDashboard/AdminViews/Admins/Admins";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

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
        <Route path="/donaciones" element={<Done />} />
        <Route path="/donacion-exitosa" element={<DonationSuccess />} />
        <Route path="/donacion-fallida" element={<DonationFailure />} />
        <Route path="/activeCases" element={<ActiveCases />} />
        <Route path="/honorific" element={<Honorific />} />        
        <Route path="/noticia/:id" element={<Detail />} />
        <Route path="/nuestro-trabajo" element={<OurWork />} />
        <Route path="/nuestro-trabajo/:id" element={<WorkDetail />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/foro/primer-foro-social" element={<SocialForum />} />
        <Route element={<ProtectedRoute />}>
        </Route>
        <Route path="/panel-admin" element={<Navigate to="/panel-admin/donaciones"/>} />
        <Route path="/panel-admin/original" element={<PanelAdmin/>}/>
        <Route path="/panel-admin/:form" element={<PanelAdminForm />} />
        <Route path="/panel-admin/donaciones" element={<Donations/>}/>
        <Route path="/panel-admin/suscripciones" element={<Subscriptions/>}/>
        <Route path="/panel-admin/nuestros-trabajo" element={<OurWorks/>}/>
        <Route path="/panel-admin/publicaciones" element={<Publications/>}/>
        <Route path="/panel-admin/galeria" element={<GalleryAdmin/>}/>
        <Route path="/panel-admin/radio" element={<Radio/>}/>
        <Route path="/panel-admin/admins" element={<Admins/>}/>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
