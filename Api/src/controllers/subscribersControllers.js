const mailchimp = require("./Mailchimp");
const mailSettings = require("../utils/Nodemailer");

//Obtiene toda la meta información de las listas en Mailchimp
const getSubscribers = async (req, res) => {
  try {
    const response = await mailchimp.lists.getAllLists();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //GET - http://localhost:3001/subscribers

//Obtiene todos los contactos de una lista en Mailchimp
const getMembers = async (req, res) => {
  const { listId } = req.params;
  console.log(listId);
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //GET - http://localhost:3001/subscribers/members/1b8c4df414

//Crea un contacto en una lista en Mailchimp
const postMembers = async (req, res) => {
  const { listId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const searchResult = await mailchimp.searchMembers.search(listId, {
      query: email,
    });
    if (searchResult.exact_matches.members.length > 0) {
      return res.status(400).json({ error: "Ya existe el suscriptor" });
    }

    const memberData = {
      email_address: email,
      merge_fields: {
        FNAME: name,
        PHONE: phone,
      },
      status: "subscribed",
    };

    const response = await mailchimp.lists.addListMember(listId, memberData);

    const transporter = mailSettings.transporter;
    const mailWelcome = mailSettings.mailWelcome(email);
    transporter.sendMail(mailWelcome, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo enviado con éxito.");
      }
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al agregar el suscriptor" });
  }
}; //POST - http://localhost:3001/subscribers/members/1b8c4df414

//Elimina un contacto en una lista en Mailchimp
const deleteMembers = async (req, res) => {
  const { listId, id } = req.params;
  console.log(listId, id);
  try {
    const response = await mailchimp.lists.deleteListMember(listId, id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; //DELETE - http://localhost:3001/subscribers/members/1b8c4df414/14c805afbd9d83dfd9ab1f551c4f54d2

module.exports = {
  getSubscribers,
  getMembers,
  postMembers,
  deleteMembers,
};
