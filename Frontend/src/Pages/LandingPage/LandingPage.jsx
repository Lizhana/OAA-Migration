import { Toaster } from "sonner";
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import Communities from "../../Components/LandingPage/Communities/Communities";
import Agroecology from "../../Components/LandingPage/Agroecology/Agroecology";
import MostReadNews from "../../Components/LandingPage/MostReadNews/MostReadNews";
import Footer from "../../Components/LandingPage/Footer/Footer";
import Gallery from '../Gallery/Gallery';
import Newsletter from '../../Components/LandingPage/Newsletter/Newsletter';

export default function LandingPage() {

  return (
    <> 
      <Newsletter />
      <Toaster richColors closeButton position="top-right" />
      <Hero />
      <PresentationIcons />
      <Communities />
      <MostReadNews />
      <Agroecology />      
      <Gallery />
      <Footer />
    </>
  );
};
