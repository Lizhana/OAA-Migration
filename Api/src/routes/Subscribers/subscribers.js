const { Router } = require("express");
const subscribers = require("../../controllers/subscribersControllers");
const subscribersRouter = Router();


subscribersRouter.get("/", subscribers.getSubscribers);                             //Traer toda la meta información de las listas existentes en Mailchimp
subscribersRouter.get("/:id", subscribers.getMembers);                  //Traer todos los contactos de una lista en Mailchimp
subscribersRouter.post("/", subscribers.postMembers);                //Crea un contacto en una lista en Mailchimp
subscribersRouter.delete(":id", subscribers.deleteMembers);        //Elimina un contacto en una lista en Mailchimp


module.exports = subscribersRouter;