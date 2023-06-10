const galleryService = require("../service/galleryService");

const getGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getGalleries();
    return res.status(200).json(galleries);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de la galería.";
    return res.status(status).json({ message });
  }
};

const getActiveGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getActiveGalleries();
    return res.status(200).json(galleries);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos de la galería.";
    return res.status(status).json({ message });
  }
};

const getGalleryById = async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await galleryService.getGalleryById(id);
    if (!gallery) {
      return res.status(404).json({ message: "La galería no se encontró" });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la galería.";
    return res.status(status).json({ message });
  }
};

const getActiveGalleryById = async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await galleryService.getActiveGalleryById(id);
    if (!gallery) {
      return res.status(404).json({ message: "La galería no se encontró" });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener la galería activa.";
    return res.status(status).json({ message });
  }
};

const postGallery = async (req, res) => {
  const galleryData = req.body;

  try {
    const createdGallery = await galleryService.createGallery(galleryData);
    return res.status(200).json(createdGallery);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la galería.";
    return res.status(status).json({ message });
  }
};

const putGallery = async (req, res) => {
  const { id } = req.params;
  const galleryData = req.body;

  try {
    const updatedGallery = await galleryService.updateGallery(id, galleryData);
    return res.status(200).json(updatedGallery);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar la galería.";
    return res.status(status).json({ message });
  }
};

const desactivateGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const desactivatedGallery = await galleryService.desactivateGallery(id);
    return res
      .status(200)
      .json({ message: "Galería desactivada exitosamente" });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al desactivar la galería.";
    return res.status(status).json({ message });
  }
};

const activateGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const activatedGallery = await galleryService.activateGallery(id);
    return res.status(200).json({ message: "Galería reactivada exitosamente" });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la galería.";
    return res.status(status).json({ message });
  }
};

const deleteGallery = async (req, res) => {
  const { id } = req.params;

  try {
    await galleryService.deleteGallery(id);
    return res.status(204).json({ message: "Galería eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la galería.";
    return res.status(status).json({ message });
  }
};

module.exports = {
  getGalleries,
  getActiveGalleries,
  getGalleryById,
  getActiveGalleryById,
  postGallery,
  putGallery,
  activateGallery,
  desactivateGallery,
  deleteGallery,
};
