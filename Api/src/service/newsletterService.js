const { Newsletter } = require('../db'); // 

const getNewsletters = async () => {
  try {
    const newsletters = await Newsletter.findAll({
      order: [['createdAt', 'DESC']],
    });

    return newsletters;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las newsletters.';
    throw { status, message };
  }
};

const getNewsletterById = async (id) => {
  try {
    const newsletter = await Newsletter.findByPk(id);
    if (!newsletter) {
      throw { status: 404, message: 'La newsletter no se encontró.' };
    }
    return newsletter;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener la newsletter.';
    throw { status, message };
  }
};

const createNewsletter = async (name, email) => {
  try {
    const newsletter = await Newsletter.create({ name, email });

    return newsletter;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al crear la newsletter.';
    throw { status, message };
  }
};

const deleteNewsletter = async (id) => {
  try {
    const newsletter = await Newsletter.findByPk(id);
    if (!newsletter) {
      const message = `Newsletter con id ${id} no encontrado`;
      throw { status: 404, message };
    }
    await newsletter.destroy();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || `Ocurrió un error al eliminar Newsletter con id ${id}`;
    throw { status, message };
  }
};


module.exports = {
  getNewsletters,
  getNewsletterById,
  createNewsletter,
  deleteNewsletter
};