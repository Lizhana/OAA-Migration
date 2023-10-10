const { Donations } = require("../db");
const mercadopago = require("../utils/mercadopago.js");

const getDonations = async () => {
  try {
    const donations = await Donations.findAll();
    return donations.reverse();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las donaciones.";
    throw { status, message };
  }
};

const getDonationById = async (id) => {
  try {
    const donation = await Donations.findByPk(id);
    if (!donation) {
      throw { status: 404, message: "La donación no se encontró." };
    }
    return donation;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la donación.";
    throw { status, message };
  }
};

const createOrder = async ({ name, email, country, amount, publicDonation }) => {
  try {
    const { body } = await mercadopago.preferences.create({
      items: [{
        title: "Donación",
        quantity: 1,
        currency_id: "ARS",
        unit_price: Number(amount)
      }],
      payer: {
        name,
        email,
      },
      back_urls: {
        success: "http://localhost:5173/donacion-exitosa",
        pending: "",
        failure: "http://localhost:5173/donacion-fallida",
      },
      auto_return: "approved",
    });

    return body.init_point;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la orden.";
    throw { status, message };
  }
};

const createDonation = async ({ id, name, email, country, amount, publicDonation }) => {
  try {
    const { body } = await mercadopago.preferences.findById(id);
    if(body.payer.email !== email) throw { status: 404, message: "El usuario del donante es incorrecto" };

    const newDonation = await Donations.create({ name, email, country, amount, publicDonation });
    return newDonation;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la donación.";
    throw { status, message };
  }
}

const desactivateDonation = async (id) => {
  try {
    const donation = await Donations.findByPk(id);
    if (!donation) {
      throw { status: 404, message: "Donación no encontrada" };
    }
    donation.isDeleted = true;
    await donation.save();
    return { message: "Donación eliminada exitosamente" };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al eliminar la donación.";
    throw { status, message };
  }
};

const activateDonation = async (id) => {
  try {
    const donation = await Donations.findByPk(id);
    if (!donation) {
      throw {
        status: 404,
        message: `La donación con id ${id} no fue encontrada`,
      };
    }
    donation.isDeleted = false;
    await donation.save();
    return { message: "Donación reactivada exitosamente" };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la donación.";
    throw { status, message };
  }
};

const deleteDonation = async (id) => {
  try {
    const deletedDonation = await Donations.findByPk(id);
    if (!deletedDonation) {
      throw {
        status: 404,
        message: `La donación con id ${id} no fue encontrada`,
      };
    }
    await deletedDonation.destroy();
    return { message: "Donación eliminada exitosamente" };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la donación.";
    throw { status, message };
  }
};

module.exports = {
  getDonations,
  getDonationById,
  createOrder,
  createDonation,
  desactivateDonation,
  activateDonation,
  deleteDonation,
};
