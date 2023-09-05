const ourWorkService = require("../service/ourWorkService");

const getOurWorks = async (req, res) => {
  try {
    const works = await ourWorkService.getAllOurWorks();
    return res.status(200).json(works);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const getActiveOurWorks = async (req, res) => {
  try {
    const works = await ourWorkService.getActiveOurWorks();
    return res.status(200).json(works);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const getOurWorkById = async (req, res) => {
  const { id } = req.params;
  try {
    const work = await ourWorkService.getOurWorkById(id);
    if (!work) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    return res.status(200).json(work);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const getActiveOurWorkById = async (req, res) => {
  const { id } = req.params;
  try {
    const work = await ourWorkService.getActiveOurWorkById(id);
    if (!work) {
      return res.status(404).json({ message: "Publicación no disponible." });
    }
    return res.status(200).json(work);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo activo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const postOurWork = async (req, res) => {
  const {
    titleMain,
    date,
    location,
    description,
    image,
    multimedia,
    extraData,
    isFinished,
    labels,
  } = req.body;
  try {
    const data = {
      titleMain,
      date,
      location,
      description,
      image,
      multimedia,
      extraData,
      isFinished,
      labels,
    };
    const newOurWork = await ourWorkService.createOurWork(data);
    return res.status(201).json(newOurWork);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const putOurWork = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    location,
    description,
    image,
    multimedia,
    extraData,
    isFinished,
    labels,
  } = req.body;
  try {
    const data = {
      titleMain,
      date,
      location,
      description,
      image,
      multimedia,
      extraData,
      isFinished,
      labels,
    };
    const updatedOurWork = await ourWorkService.updateOurWork(Number(id), data);
    return res.status(200).json(updatedOurWork);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al actualizar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const desactivateOurWork = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ourWorkService.desactivateOurWork(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al eliminar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const activateOurWork = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ourWorkService.activateOurWork(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al restaurar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  }
};

const deleteOurWork = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ourWorkService.deleteOurWork(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar el archivo.";
    return res.status(status).json({ message });
  }
};

module.exports = {
  getOurWorks,
  getActiveOurWorks,
  getActiveOurWorkById,
  getOurWorkById,
  postOurWork,
  putOurWork,
  activateOurWork,
  desactivateOurWork,
  deleteOurWork,
};
