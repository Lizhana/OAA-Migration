const { Router } = require("express");
const newsletterC = require("../../controllers/newsletterControllers");
const newsletterRouter = Router();

//-----> http://localhost:3001/newsletter

// ---- GET
newsletterRouter.get("/", newsletterC.getNewsletters);

newsletterRouter.get("/:id", newsletterC.getNewsletterById);

//----POST
newsletterRouter.post("/", newsletterC.postNewsletter);

//----DELETE
newsletterRouter.delete("/:id", newsletterC.deleteNewsletter);

module.exports = newsletterRouter;
