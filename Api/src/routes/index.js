const { Router } = require("express");
const route = Router();
const adminRouter = require("./Admin/adminRoutes");
const donationsRouter = require("./Donations/donations");
const galleryRouter = require("./Gallery/gallery");
const newsRouter = require("./News/NewsRoutes");
// const newsletterRouter = require("./Newsletter/newsletterRoutes");
const ourWorkRouter = require("./OurWork/ourWork");
const radioProgramRouter = require("./RadioProgram/radioProgram");
const subscribersRouter = require("./Subscribers/subscribers");


/*--------------Rutas--------------*/
route.use("/admin", adminRouter); // Endpoint para los admin
route.use("/donations", donationsRouter); // Endpoint para donaciones
route.use("/gallery", galleryRouter); // Endpoint para Galería
route.use("/news", newsRouter); // Endpoint para las News
// route.use("/newsletter", newsletterRouter); // Endpoint para las Newsletter
route.use("/work", ourWorkRouter); // Endpoint para OurWork
route.use("/radio-program", radioProgramRouter); // Endpoint para programa de radio
route.use("/subscribers", subscribersRouter); // Endpoint para suscriptores

module.exports = route;
