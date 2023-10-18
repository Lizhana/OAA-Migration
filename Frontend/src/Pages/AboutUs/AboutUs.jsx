import styles from "./AboutUs.module.css";
import ImageAbout from "../../assets/Ecologia1.jpg"
import { RiCommunityLine } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { TbGavel } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";

export default function AboutUs() {

  return (
    <div className={styles.aboutUs}>
      <h1 className={styles.titleAbout}>Sobre Nosotros</h1>

      <p className={styles.contentAbout}>Nacimos como un colectivo de víctimas de agresiones socioambientales y a la salud, que no encontrando respuestas eficaces en la Institucionalidad estatal, entendimos que sólo podríamos hacer valer nuestros derechos vulnerados conformándonos como una organización horizontal basada en el apoyo mutuo y en la independencia plena de los poderes económicos y políticos.</p>
      <p className={styles.contentAbout}>El impulso fundacional de nuestra organización se dió en el contexto el conflicto contra la instalación ilegal de empresas contaminantes en el entorno rural de Parada el Gallo, Partido de Pilar, en donde varias familias veían amenazado su modo de vida basado en sus producciones agroecológicas. Este conflicto fue el punto de partida y núcleo inicial de nuestra Organización, a partir del cual comenzamos nuestro aprendizaje en la creación de formas novedosas, coherentes y eficaces de lucha socioambiental. Sobre esta base se obtuvieron logros importantes como la sanción de la Ordenanza N° 247/16 de Pilar, mediante la cual se logró obtener el reconocimiento por parte del Estado municipal de la grave situación ambiental de la localidad, y su Declaración en Emergencia Ambiental.</p>
      <p className={styles.contentAbout}>Desde aquella primera experiencia de organización y lucha popular, fuimos creciendo a partir del vínculo con otras comunidades en conflicto que entendieron la necesidad de involucrarse activamente en la defensa de sus propios territorios. Así, desde 2017 la lucha de la comunidad de Villa Rosa y Matheu contra la Instalación de las termoeléctricas constituyó el segundo y decisivo hito que condujo a nuestra conformación formal como Asociación Civil en mayo de 2018.</p>
      <p className={styles.contentAbout}>Nuestra Asociación organizó el Primer foro ambiental “Naturaleza somos” que se llevó a cabo en Villa Rosa, Pilar, el 5 de octubre de 2019, con la concurrencia de más de 100 personas, tanto representantes de organizaciones como público en general interesado en la temática.</p>
      <p className={styles.contentAbout}>Desde entonces, Ambientalistas Autoconvocades crece continuamente, acompañando a las comunidades en conflicto, en un diálogo incesante y de aprendizaje mutuo que nos hace cada día más fuertes en la lucha. En Pilar, en Luján, en Mercedes, en Zárate, en Escobar, en Exaltación de la Cruz, en Tigre, en San Nicolás, en Mar del Plata, entre otros distritos, trabajamos codo a codo junto a quienes reclaman por su derecho humano básico al ambiente sano y a la salud.</p>

      <h2 className={styles.subtitleAbout}>Valores</h2>
      <p className={styles.contentAbout}>Desde el principio supimos que la elección de disputar sin apoyo de poderes políticos y económicos conlleva un camino difícil y largo, pero con la misma convicción sostuvimos y sostenemos que es el único que conduce a logros verdaderamente sólidos y duraderos. Entendemos que sólo el compromiso de las comunidades con su propia realidad socioambiental tiene el potencial de imponer cambios transformadores a la lógica y la dinámica del Poder. Por eso entendemos nuestra lucha, ante todo, como lucha social, cultural y política. No sólo ponemos en juego el reclamo por un derecho, sino también los paradigmas culturales y ético políticos que desafían axiomáticamente la lógica de despojo y depredación asociada al modelo económico y sociocultural hegemónico, origen de la crisis civilizatoria a la que se enfrenta nuestra sociedad.</p>
      <p className={styles.contentAbout}>Por ello, entendemos que la exigibilidad de la ley debe ser el piso, y no el techo, de la lucha socioambiental. Pues en el camino hemos ido comprendiendo la necesidad de cambiar radicalmente las matrices cognitivas y éticas de la sociedad del despilfarro. Por ello, actuamos en Administración, en Justicia, en Difusión, en Formación, en visibilización y en movilización, alimentando esa potencia transformadora que sólo puede surgir de las comunidades.</p>
      <p className={styles.contentAbout}>No aceptamos aportes de Corporaciones ni de Estados, ni de Entidades financiadas por Corporaciones o Estados. Todos nuestros integrantes trabajan como voluntarios, donando tiempo de trabajo. Si considerás que nuestro trabajo es valioso, te pedimos que consideres apoyarnos económicamente o sumarte a nuestro voluntariado para que cada día podamos superarnos en nuestros logros.</p>

      <h2 className={styles.subtitleAbout}>¿Qué hacemos?</h2>
      <div className={styles.containerCardAbout}>
        <div className={styles.cardAbout}>
          <HiUserGroup className={styles.iconAbout} />
          <p>Formamos redes de organizaciones para fortalecer mutualmente capacidades</p>
        </div>
        <div className={styles.cardAbout}>
          <RiCommunityLine className={styles.iconAbout} />
          <p>Asesoramos a comunidades en conflicto</p>
        </div>
        <div className={styles.cardAbout}>
          <TbGavel className={styles.iconAbout} />
          <p>Actuamos en sede administrativa y judicial ante conflictos ambientales</p>
        </div>
        <div className={styles.cardAbout}>
          <FiShare2 className={styles.iconAbout} />
          <p>Generamos recursos e información compartida</p>
        </div>
      </div>
    </div>
  );
}
