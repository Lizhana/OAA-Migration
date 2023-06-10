const { Donations } = require("../db");

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

const createDonation = async (iso, amount, extraData) => {
  try {
    const createdDonation = await Donations.create({ iso, amount, extraData });
    return createdDonation;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la donación.";
    throw { status, message };
  }
};

const deactivateDonation = async (id) => {
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
  createDonation,
  deactivateDonation,
  activateDonation,
  deleteDonation,
};
