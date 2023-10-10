const { Router } = require("express");
const galleryRouter = Router();
const gallery = require("../../controllers/galleryControllers");

// URL: http://localhost:3001/gallery

// ---- GET *
galleryRouter.get("/", gallery.getGalleries); //----->  Traer a todos los datos

galleryRouter.get("/active", gallery.getActiveGalleries); //----->  Traer solo los datos activos

galleryRouter.get("/active/:id", gallery.getActiveGalleryById); //----->  Traer a un dato activo

galleryRouter.get("/detail/:id", gallery.getGalleryById); //----->  Traer a un dato

//----POST *
galleryRouter.post("/", gallery.postGallery); // ----> Crear un nuevo dato

//----PUT *
galleryRouter.put("/detail/:id", gallery.putGallery); //----->  Editar un archivo

galleryRouter.put("/desactivate/:id", gallery.desactivateGallery); //----> Eliminar un archivo con borrado lógico

galleryRouter.put("/activate/:id", gallery.activateGallery); // --> Recuperar un archivo con borrado lógico

//----DELETE *
galleryRouter.delete("/:id", gallery.deleteGallery); // ---> Borrado real

module.exports = galleryRouter;
