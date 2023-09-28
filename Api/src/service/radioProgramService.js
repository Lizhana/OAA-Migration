const { RadioPrograms } = require("../db");

const getRadioPrograms = async () => {

  try {
    const radioPrograms = await RadioPrograms.findAll();
    return radioPrograms;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos del programa de radio.";
    throw { status, message };
  }
};

const getActiveRadioPrograms = async () => {
  try {
    const radioPrograms = await RadioPrograms.findAll({
      where: { isDeleted: false },
    });
    return radioPrograms;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos del programa de radio.";
    throw { status, message };
  }
};

const getRadioProgramById = async (id) => {
  try {
    const radioProgram = await RadioPrograms.findByPk(id);
    return radioProgram;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    throw { status, message };
  }
};

const getRadioProgramByTitle = async (titleMain) => {
  try {
    const radioProgram = await RadioPrograms.findOne({
      where:{titleMain}
    });
    console.log(radioProgram);

    return radioProgram;
    
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    throw { status, message };
    
  }
}
const getActiveRadioProgramById = async (id) => {
  try {
    const radioProgram = await RadioPrograms.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    return radioProgram;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    throw { status, message };
  }
};

const createRadioProgram = async (data) => {
  console.log(data)

  try {
    const createdRadioProgram = await RadioPrograms.create(data);
    return createdRadioProgram;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al crear el programa de radio.";
    throw { status, message };
  }
};

const updateRadioProgram = async (id, data) => {
  try {
    const [affectedRows, updatedRadioProgram] = await RadioPrograms.update(
      data,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedRows === 0) {
      throw {
        status: 404,
        message: `El programa de radio con ID ${id} no fue encontrado.`,
      };
    }

    return updatedRadioProgram[0];
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar el programa de radio.";
    throw { status, message };
  }
};

const desactivateRadioProgram = async (id) => {
  try {
    const radioProgram = await RadioPrograms.findByPk(id);
    if (!radioProgram) {
      throw { status: 404, message: "Programa de radio no encontrado." };
    }
    radioProgram.isDeleted = true;
    await radioProgram.save();
    return { message: "Programa de radio desactivado exitosamente." };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al desactivar el programa de radio.";
    throw { status, message };
  }
};

const activateRadioProgram = async (id) => {
  try {
    const radioProgram = await RadioPrograms.findByPk(id);

    if (!radioProgram) {
      throw {
        status: 404,
        message: `El programa de radio con id ${id} no fue encontrado.`,
      };
    }
    radioProgram.isDeleted = false;
    await radioProgram.save();
    return { message: "Programa de radio reactivado exitosamente." };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar el programa de radio.";
    throw { status, message };
  }
};

const deleteRadioProgram = async (id) => {
  try {
    const deletedRadioProgram = await RadioPrograms.findByPk(id);

    if (!deletedRadioProgram) {
      throw {
        status: 404,
        message: `El programa de radio con id ${id} no fue encontrado.`,
      };
    }
    await deletedRadioProgram.destroy();
    
    return { message: "Programa de radio eliminado exitosamente." };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al borrar el programa de radio.";
    throw { status, message };
  }
};

module.exports = {
  getActiveRadioPrograms,
  getRadioProgramById,
  getActiveRadioProgramById,
  activateRadioProgram,
  desactivateRadioProgram,
  deleteRadioProgram,
  updateRadioProgram,
  createRadioProgram,
  getRadioProgramByTitle,
  getRadioPrograms
};
