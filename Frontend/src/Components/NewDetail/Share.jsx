import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import Styles from "./detailNews.module.css";

export default function ShareButtons() {
  const shareUrl = window.location.href; // obtiene la URL actual de la página

  return (
    <div className={Styles.containerIcons} >
      {/* Compartir en Facebook */}
      <FacebookShareButton url={shareUrl} >
        <BsFacebook className={Styles.bsFacebook}  />
      </FacebookShareButton>

      {/* Compartir en Twitter */}
      <TwitterShareButton url={shareUrl}>
        <AiFillTwitterCircle className={Styles.aiFillTwitterCircle} />
      </TwitterShareButton>

      {/* Compartir en WhatsApp */}
      <WhatsappShareButton url={shareUrl}>
        <IoLogoWhatsapp className={Styles.ioLogoWhatsapp} />
      </WhatsappShareButton>

      {/* Compartir por correo electrónico */}
      <EmailShareButton url={shareUrl}>
        <SiGmail className={Styles.siGmail} />
      </EmailShareButton>
    </div>
  );
}
