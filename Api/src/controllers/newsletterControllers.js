const newsletterService = require('../service/newsletterService')


const getNewsletters = async (req, res) => {
  try {
    const newsletters = await newsletterService.getNewsletters();

    return res.status(200).json(newsletters);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las newsletters.';
    return res.status(status).json({ message });
  }
};


const getNewsletterById = async (req, res) => {
  const { id } = req.params;

  try {
    const newsletter = await newsletterService.getNewsletterById(id);

    return res.status(200).json(newsletter);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener la newsletter.';
    return res.status(status).json({ message });
  }
};

const postNewsletter = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newsletter = await newsletterService.createNewsletter(name, email);

    return res.status(201).json(newsletter);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al crear la newsletter.';
    return res.status(status).json({ message });
  }
};

const deleteNewsletter = async (req, res) => {
  const { id } = req.params;

  try {
    await newsletterService.deleteNewsletter(id);

    return res.status(204).json({ message: 'La eliminación se realizó con éxito' });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || `Ocurrió un error al eliminar Newsletter con id ${id}`;
    return res.status(status).json({ message });
  }
};


module.exports = {
  getNewsletters,
  getNewsletterById,
  postNewsletter,
  deleteNewsletter
};