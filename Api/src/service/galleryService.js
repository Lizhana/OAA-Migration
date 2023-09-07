const { Galleries } = require("../db");

const getGalleries = async () => {
  try {
    const galleries = await Galleries.findAll();
    const parsedGalleries = galleries.map((item) => {
      const parsedImage = JSON.parse(item.image);
      const parsedVideo = JSON.parse(item.video);
      const parsedMultimedia = JSON.parse(item.multimedia || "[]");
      const parsedLabels = JSON.parse(item.labels || "{}");

      return {
        ...item.toJSON(),
        image: parsedImage,
        video: parsedVideo,
        multimedia: parsedMultimedia,
        labels: parsedLabels,
      };
    });

    return parsedGalleries.reverse();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de la galería.";
    throw { status, message };
  }
};

const getActiveGalleries = async () => {
  try {
    const galleries = await Galleries.findAll({ where: { isDeleted: false } });
    const parsedGalleries = galleries.map((item) => {
      const parsedImage = JSON.parse(item.image);
      const parsedVideo = JSON.parse(item.video);
      const parsedMultimedia = JSON.parse(item.multimedia || "[]");
      const parsedLabels = JSON.parse(item.labels || "{}");

      return {
        ...item.toJSON(),
        image: parsedImage,
        video: parsedVideo,
        multimedia: parsedMultimedia,
        labels: parsedLabels,
      };
    });

    return parsedGalleries.reverse();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos de la galería.";
    throw { status, message };
  }
};

const getGalleryById = async (id) => {
  try {
    const gallery = await Galleries.findByPk(id);
    if (!gallery) {
      throw { status: 404, message: "La galería no se encontró" };
    }

    return gallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la galería.";
    throw { status, message };
  }
};

const getActiveGalleryById = async (id) => {
  try {
    const gallery = await Galleries.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!gallery) {
      throw { status: 404, message: "La galería no se encontró" };
    }

    return gallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener la galería activa.";
    throw { status, message };
  }
};

const createGallery = async (galleryData) => {
  try {
    const existGallery = await Galleries.findOne({
      where: {
        titleMain: galleryData.titleMain,
      },
    });

    if (existGallery) {
      throw {
        status: 409,
        message: `La galería con el título: "${galleryData.titleMain}" ya existe`,
      };
    }

    const createdGallery = await Galleries.create(galleryData);

    return createdGallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la galería.";
    throw { status, message };
  }
};

const updateGallery = async (id, galleryData) => {
  try {
    const updatedGallery = await Galleries.findByPk(id);

    if (!updatedGallery) {
      throw {
        status: 404,
        message: `La galería con ID ${id} no fue encontrada`,
      };
    }

    await updatedGallery.update(galleryData);

    return updatedGallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar la galería.";
    throw { status, message };
  }
};

const desactivateGallery = async (id) => {
  try {
    const gallery = await Galleries.findByPk(id);

    if (!gallery) {
      throw {
        status: 404,
        message: "Galería no encontrada",
      };
    }

    gallery.isDeleted = true;
    await gallery.save();

    return gallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al desactivar la galería.";
    throw { status, message };
  }
};

const activateGallery = async (id) => {
  try {
    const gallery = await Galleries.findByPk(id);

    if (!gallery) {
      throw {
        status: 404,
        message: `La galería con id ${id} no fue encontrada`,
      };
    }

    gallery.isDeleted = false;
    await gallery.save();

    return gallery;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la galería.";
    throw { status, message };
  }
};

const deleteGallery = async (id) => {
  try {
    const deletedGallery = await Galleries.findByPk(id);

    if (!deletedGallery) {
      throw {
        status: 404,
        message: `La galería con id ${id} no fue encontrada`,
      };
    }

    await deletedGallery.destroy();

    return;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la galería.";
    throw { status, message };
  }
};

module.exports = {
  getGalleries,
  getActiveGalleries,
  getGalleryById,
  getActiveGalleryById,
  createGallery,
  updateGallery,
  activateGallery,
  desactivateGallery,
  deleteGallery,
};
