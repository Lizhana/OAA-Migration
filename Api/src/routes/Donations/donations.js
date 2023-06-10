const { Router } = require("express");
const donationsRouter = Router();
const donations = require("../../controllers/donationsControllers");

// URL: http://localhost:3001/donations

// ---- GET *
donationsRouter.get("/", donations.getDonations); //----->  Traer a todos los datos

donationsRouter.get("/detail/:id", donations.getDonationById); //----->  Traer a un dato

//----POST *
donationsRouter.post("/", donations.postDonation); // ----> Crear un nuevo dato

//----PUT *
donationsRouter.put("/deactivate/:id", donations.deactivateDonation); //----> Eliminar un archivo con borrado lógico

donationsRouter.put("/activate/:id", donations.activateDonation); // --> Recuperar un archivo con borrado lógico

//----DELETE *
donationsRouter.delete("/:id", donations.deleteDonation); // ---> Borrado real

module.exports = donationsRouter;
