const { News } = require('../db');

const getAllNews = async () => {
  try {
    const news = await News.findAll();

    return news.reverse();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las noticias.';
    throw { status, message };
  }
};

const getActiveNews = async () => {
  try {
    const news = await News.findAll({ where: { isDeleted: false } });

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las noticias activas.';
    throw { status, message };
  }
};

const getNewsById = async (id) => {
  try {
    const news = await News.findByPk(id);

    if (!news) {
      throw { status: 404, message: 'La noticia no se encontró' };
    }

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al obtener la noticia.';
    throw { status, message };
  }
};

const getActiveNewsById = async (id) => {
  try {
    const news = await News.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!news) {
      throw { status: 404, message: 'La noticia no se encontró' };
    }

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al obtener la noticia.';
    throw { status, message };
  }
};

const getThreeNews = async () => {
  try {
    const news = await News.findAll({
      order: [['date', 'DESC']],
      limit: 3,
    });

    if (!news.length) {
      return null;
    }

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las noticias.';
    throw { status, message };
  }
};

const getThreeNewsByCategory = async (category) => {
  try {
    const news = await News.findAll({
      where: { category },
      order: [['date', 'DESC']],
      limit: 3,
    });

    if (!news.length) {
      return null;
    }

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al obtener las noticias.';
    throw { status, message };
  }
};

const createNews = async (newsData) => {
  try {
    const createdNews = await News.create(newsData);

    return createdNews;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al crear la noticia.';
    throw { status, message };
  }
};

const updateNews = async (id, newsData) => {
  try {
    const [affectedRows] = await News.update(newsData, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      throw {
        status: 404,
        message: `La noticia con ID ${id} no fue encontrada`,
      };
    }

    const updatedNews = await News.findByPk(id);

    return updatedNews;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al actualizar la noticia.';
    throw { status, message };
  }
};

const desactivateNews = async (id) => {
  try {
    const news = await News.findByPk(id);

    if (!news) {
      throw { status: 404, message: 'Noticia no encontrada' };
    }

    news.isDeleted = true;
    await news.save();

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al eliminar la noticia.';
    throw { status, message };
  }
};

const activateNews = async (id) => {
  try {
    const news = await News.findByPk(id);

    if (!news) {
      throw {
        status: 404,
        message: `La publicación con id ${id} no fue encontrada`,
      };
    }

    news.isDeleted = false;
    await news.save();

    return news;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || 'Ocurrió un error al reactivar la noticia.';
    throw { status, message };
  }
};

const deleteNews = async (id) => {
  try {
    const deletedNews = await News.findByPk(id);

    if (!deletedNews) {
      throw {
        status: 404,
        message: `La publicación con id ${id} no fue encontrada`,
      };
    }

    await deletedNews.destroy();

    return deletedNews;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al eliminar la noticia.';
    throw { status, message };
  }
};

module.exports = {
  getAllNews,
  getActiveNews,
  getNewsById,
  getActiveNewsById,
  getThreeNews,
  getThreeNewsByCategory,
  createNews,
  updateNews,
  desactivateNews,
  activateNews,
  deleteNews,
};
