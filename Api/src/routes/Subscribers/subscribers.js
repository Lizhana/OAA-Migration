const { Router } = require("express");
const subscribers = require("../../controllers/subscribersControllers");
const subscribersRouter = Router();


subscribersRouter.get("/", subscribers.getSubscribers);

subscribersRouter.get("/count", subscribers.getCountSubscribers);

subscribersRouter.post("/", subscribers.postSubscriber);

subscribersRouter.delete("/", subscribers.deleteSubscriber);


module.exports = subscribersRouter;