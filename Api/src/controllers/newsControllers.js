const newsService = require("../service/newsService");

const getNews = async (req, res) => {
  try {
    const news = await newsService.getAllNews();
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las noticias.";
    return res.status(status).json({ message });
  }
};

const getActiveNews = async (req, res) => {
  try {
    const news = await newsService.getActiveNews();
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las noticias activas.";
    return res.status(status).json({ message });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await newsService.getNewsById(id);
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la noticia.";
    return res.status(status).json({ message });
  }
};

const getActiveNewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await newsService.getActiveNewsById(id);
    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la noticia.";
    return res.status(status).json({ message });
  }
};

const getThreeNews = async (req, res) => {
  try {
    const news = await newsService.getThreeNews();

    if (!news) {
      return res.status(204).send();
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las noticias.";
    return res.status(status).json({ message });
  }
};

const getThreeNewsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const news = await newsService.getThreeNewsByCategory(category);

    return res.status(200).json(news);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las noticias.";
    return res.status(status).json({ message });
  }
};

const postNews = async (req, res) => {
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    location,
    introduction,
    image,
    description,
    multimedia,
    visitorCounter,
    extraData,
    labels,
  } = req.body;

  try {
    const newsData = {
      titleMain,
      date,
      category,
      author,
      urlAuthor,
      location,
      introduction,
      image,
      description,
      multimedia,
      visitorCounter,
      extraData,
      labels,
    };

    const createdNews = await newsService.createNews(newsData);

    return res.status(200).json(createdNews);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la noticia.";
    return res.status(status).json({ message });
  }
};

const putNews = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    location,
    introduction,
    image,
    description,
    labels,
    multimedia,
    visitorCounter,
    extraData,
  } = req.body;

  try {
    const newsData = {
      titleMain,
      date,
      category,
      author,
      urlAuthor,
      location,
      introduction,
      image,
      description,
      labels,
      multimedia,
      visitorCounter,
      extraData,
    };

    const updatedNews = await newsService.updateNews(id, newsData);

    return res.status(200).json(updatedNews);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar la noticia.";
    return res.status(status).json({ message });
  }
};

const desactivateNews = async (req, res) => {
  const { id } = req.params;

  try {
    const deactivatedNews = await newsService.deactivateNews(id);

    return res.status(200).json({ message: "Noticia eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar la noticia.";
    return res.status(status).json({ message });
  }
};

const activateNews = async (req, res) => {
  const { id } = req.params;

  try {
    const activatedNews = await newsService.activateNews(id);

    return res.status(200).json({ message: "Noticia reactivada exitosamente" });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la noticia.";
    return res.status(status).json({ message });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNews = await newsService.deleteNews(id);

    return res
      .status(204)
      .json({ message: `News ${id} eliminada exitosamente` });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar la noticia.";
    return res.status(status).json({ message });
  }
};

module.exports = {
  getNews,
  getActiveNews,
  getNewsById,
  getActiveNewsById,
  getThreeNews,
  getThreeNewsByCategory,
  postNews,
  putNews,
  desactivateNews,
  activateNews,
  deleteNews,
};
