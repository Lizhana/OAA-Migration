import { Toaster } from "sonner";
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import Novelty from "../../Components/LandingPage/Novelty/Novelty";
import Communities from "../../Components/LandingPage/Communities/Communities";
import Agroecology from "../../Components/LandingPage/Agroecology/Agroecology";
import MostReadNews from "../../Components/LandingPage/MostReadNews/MostReadNews";
import Galery from "../../Components/LandingPage/Galery/Galery";
import Footer from "../../Components/LandingPage/Footer/Footer";
import Newsletter from '../../Components/LandingPage/Newsletter/Newsletter';

export default function LandingPage() {

  return (
    <> 
      <Newsletter />
      <Toaster richColors position="top-right" />
      <Hero />
      <PresentationIcons />
      <Novelty />
      <Communities />
      <Agroecology />
      <MostReadNews />
      <Galery />
      <Footer />
    </>
  );
};