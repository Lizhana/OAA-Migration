const { OurWorks } = require("../db");

const getAllOurWorks = async () => {
  try {
    const works = await OurWorks.findAll();
    return works.reverse();
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const getActiveOurWorks = async () => {
  try {
    const works = await OurWorks.findAll({ where: { isDeleted: false } });

    return works;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const getOurWorkById = async (id) => {
  try {
    const work = await OurWorks.findByPk(id);
    if (!work) {
      throw { status: 404, message: "El trabajo no se encontró" };
    }

    return work;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const getActiveOurWorkById = async (id) => {
  try {
    const work = await OurWorks.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!work) {
      throw { status: 404, message: "El trabajo no se encontró" };
    }

    return work;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo activo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const createOurWork = async (data) => {
  try {
    const newOurWork = await OurWorks.create(data);
    return newOurWork;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear un archivo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const updateOurWork = async (id, data) => {
  try {
    const [rowsUpdated] = await OurWorks.update(data, {
      where: { id },
  })

    const updatedResult = await OurWorks.findOne({where:{id}})

    if (rowsUpdated === 0) {
      throw { status: 404, message: "Archivo no encontrado" };
    }
    return updatedResult;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al actualizar un archivo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const desactivateOurWork = async (id) => {
  try {
    const work = await OurWorks.findByPk(id);
    if (!work) {
      throw { status: 404, message: "Archivo no encontrado" };
    }
    work.isDeleted = true;
    await work.save();
    return { message: "Eliminado exitosamente" };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al eliminar un archivo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const activateOurWork = async (id) => {
  try {
    const work = await OurWorks.findByPk(id);
    if (!work) {
      throw { status: 404, message: "Archivo no encontrado" };
    }
    work.isDeleted = false;
    await work.save();
    return { message: "Restaurado exitosamente" };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al restaurar un archivo de 'Nuestro Trabajo'.";
    throw { status, message };
  }
};

const deleteOurWork = async (id) => {
  try {
    const deletedWork = await OurWorks.findByPk(id);
    if (!deletedWork) {
      throw {
        status: 404,
        message: `El archivo con id ${id} no fue encontrada.`,
      };
    }
    await deletedWork.destroy();
    return { message: `Archivo con id ${id} fue eliminado exitosamente.` };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar el archivo.";
    throw { status, message };
  }
};

module.exports = {
  getAllOurWorks,
  getActiveOurWorks,
  getOurWorkById,
  getActiveOurWorkById,
  createOurWork,
  updateOurWork,
  desactivateOurWork,
  activateOurWork,
  deleteOurWork,
};
