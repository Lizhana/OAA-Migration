const { Router } = require("express");
const ourWork = require("../../controllers/ourWorkControllers");
const ourWorkRouter = Router();

// URL: http://localhost:3001/work

// ---- GET *
ourWorkRouter.get("/", ourWork.getOurWorks); //----->  Traer a todos los datos

ourWorkRouter.get("/active", ourWork.getActiveOurWorks); //----->  Traer solo los datos activos

ourWorkRouter.get("/active/:id", ourWork.getActiveOurWorkById); //----->  Traer a un dato activo

ourWorkRouter.get("/detail/:id", ourWork.getOurWorkById); //----->  Traer a un dato

//----POST *
ourWorkRouter.post("/", ourWork.postOurWork); // ----> Crear un nuevo dato

//----PUT *
ourWorkRouter.put("/detail/:id", ourWork.putOurWork); //----->  Editar un dato

ourWorkRouter.put("/deactivate/:id", ourWork.desactivateOurWork); //----> Eliminar un dato con borrado lógico

ourWorkRouter.put("/activate/:id", ourWork.activateOurWork); // --> Recuperar un dato con borrado lógico

//----DELETE *
ourWorkRouter.delete("/:id", ourWork.deleteOurWork); // ---> Borrado real

module.exports = ourWorkRouter;
