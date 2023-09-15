const { Subscribers } = require("../db")
const mailSettings = require("../utils/Nodemailer");
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;

const mailerlite = new MailerLite({
  api_key: process.env.MAILER_LITE_API_KEY
});

const getSubscribers = async (req, res) => {
  try {
    const { data: { data: allSubscribers } } = await mailerlite.subscribers.get()
    return res.status(200).json(allSubscribers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 

const getCountSubscribers = async (req, res) => {
  try {
    const { data: countSubs } = await mailerlite.subscribers.getCount();
    return res.status(200).json(countSubs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const postSubscriber = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ error: "El email es requerido" });

    const subscriberFound = await Subscribers.findOne({ where: { email } });
    if (subscriberFound) res.status(500).json({ error: "Ya estás suscripto" });

    
    const { data: { data } } = await mailerlite.subscribers.createOrUpdate({ email })

    const newSubscriber = await Subscribers.create({ name, email: data.email, mailerLiteId: data.id });

    return res.status(201).json(newSubscriber);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const subscriberFound = await Subscribers.findOne({ where: { email } });
    if (!subscriberFound) res.status(500).json({ error: "No se ha encontrado el suscriptor" });

    await Subscribers.destroy({ where: { email } });

    await mailerlite.subscribers.delete(subscriberFound.mailerLiteId);

    return res.status(200).json("Suscriptor eliminado");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 

module.exports = {
  getSubscribers,
  getCountSubscribers,
  postSubscriber,
  deleteSubscriber,
};
