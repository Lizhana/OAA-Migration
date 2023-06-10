const donationService = require("../service/donationsService");

const getDonations = async (req, res) => {
  try {
    const donations = await donationService.getDonations();
    return res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las donaciones.";
    return res.status(status).json({ message });
  }
};

const getDonationById = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await donationService.getDonationById(id);
    return res.status(200).json(donation);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la donación.";
    return res.status(status).json({ message });
  }
};

const postDonation = async (req, res) => {
  const { iso, amount, extraData } = req.body;

  try {
    const createdDonation = await donationService.createDonation(
      iso,
      amount,
      extraData
    );
    return res.status(200).json(createdDonation);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la donación.";
    return res.status(status).json({ message });
  }
};

const deactivateDonation = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await donationService.deactivateDonation(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al eliminar la donación.";
    return res.status(status).json({ message });
  }
};

const activateDonation = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await donationService.activateDonation(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la donación.";
    return res.status(status).json({ message });
  }
};

const deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await donationService.deleteDonation(id);
    return res.status(204).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la donación.";
    return res.status(status).json({ message });
  }
};

module.exports = {
  getDonations,
  getDonationById,
  postDonation,
  deactivateDonation,
  activateDonation,
  deleteDonation,
};
