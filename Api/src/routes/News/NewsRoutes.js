const { Router } = require("express");
const news = require("../../controllers/newsControllers");
const newsRouter = Router();

// URL: http://localhost:3001/news

// ---- GET *
newsRouter.get("/", news.getNews); //----->  Traer a todos los datos

newsRouter.get("/active", news.getActiveNews); //----->  Traer solo los datos activos

newsRouter.get("/active/:id", news.getActiveNewsById); //----->  Traer a un dato activo

newsRouter.get("/detail/:id", news.getNewsById); //----->  Traer a un dato

newsRouter.get("/recent", news.getThreeNews); //---> Traer las 3 noticias mas recientes

newsRouter.get("/category/:category", news.getThreeNewsByCategory); //---> Traer 3 de la misma categoria

//----POST *
newsRouter.post("/", news.postNews); // ----> Crear un nuevo dato

//----PUT *
newsRouter.put("/detail/:id", news.putNews); //----->  Editar un archivo

newsRouter.put("/desactivate/:id", news.desactivateNews); //----> Eliminar un archivo con borrado lógico

newsRouter.put("/activate/:id", news.activateNews); // --> Recuperar un archivo con borrado lógico

//----DELETE *
newsRouter.delete("/:id", news.deleteNews); // ---> Borrado real

module.exports = newsRouter;
