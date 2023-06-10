const { Router } = require("express");
const radioProgramRouter = Router();
const radioProgram = require("../../controllers/radioProgramControllers");

// URL: http://localhost:3001/radio-program

// ---- GET *
radioProgramRouter.get("/", radioProgram.getRadioPrograms); //----->  Traer a todos los datos

radioProgramRouter.get("/active", radioProgram.getActiveRadioPrograms); //----->  Traer solo los datos activos

radioProgramRouter.get("/active/:id", radioProgram.getActiveRadioProgramById); //----->  Traer a un dato activo

radioProgramRouter.get("/detail/:id", radioProgram.getRadioProgramById); //----->  Traer a un dato

//----POST *
radioProgramRouter.post("/", radioProgram.postRadioProgram); // ----> Crear un nuevo dato

//----PUT *
radioProgramRouter.put("/detail/:id", radioProgram.putRadioProgram); //----->  Editar un archivo

radioProgramRouter.put("/deactivate/:id", radioProgram.desactivateRadioProgram); //----> Eliminar un archivo con borrado lógico

radioProgramRouter.put("/activate/:id", radioProgram.activateRadioProgram); // --> Recuperar un archivo con borrado lógico

//----DELETE *
radioProgramRouter.delete("/:id", radioProgram.deleteRadioProgram); // ---> Borrado real

module.exports = radioProgramRouter;
