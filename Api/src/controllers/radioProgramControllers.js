const radioProgramService = require('../service/radioProgramService')

const getRadioPrograms = async (req, res) => {
  try {
    const radioPrograms = await RadioProgramsService.getRadioPrograms();
    return res.status(200).json(radioPrograms);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos del programa de radio.";
    return res.status(status).json({ message });
  }
};

const getActiveRadioPrograms = async (req, res) => {
  try {
    const radioPrograms = await RadioProgramsService.getActiveRadioPrograms();
    return res.status(200).json(radioPrograms);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos activos del programa de radio.";
    return res.status(status).json({ message });
  }
};


const getRadioProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const radioProgram = await RadioProgramsService.getRadioProgramById(id);
    if (!radioProgram) {
      return res
        .status(404)
        .json({ message: "El programa de radio no se encontró" });
    }
    return res.status(200).json(radioProgram);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    return res.status(status).json({ message });
  }
};

const getActiveRadioProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const radioProgram = await RadioProgramsService.getActiveRadioProgramById(
      id
    );
    if (!radioProgram) {
      return res
        .status(404)
        .json({ message: "El programa de radio no se encontró" });
    }
    return res.status(200).json(radioProgram);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    return res.status(status).json({ message });
  }
};

const postRadioProgram = async (req, res) => {
  const {
    titleMain,
    date,
    introduction,
    image,
    audio,
    multimedia,
    labels,
    extraData,
  } = req.body;

  try {
    const existRadioProgram = await RadioProgramsService.getRadioProgramByTitle(
      titleMain
    );
    if (existRadioProgram) {
      return res.status(409).json({
        message: `El programa de radio con el título: "${titleMain}" ya existe`,
      });
    }

    const createdRadioProgram = await RadioProgramsService.createRadioProgram({
      titleMain,
      date,
      introduction,
      image,
      audio,
      multimedia,
      labels,
      extraData,
    });

    res.status(200).json(createdRadioProgram);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al crear el programa de radio.";
    return res.status(status).json({ message });
  }
};


const putRadioProgram = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    introduction,
    image,
    audio,
    multimedia,
    labels,
    extraData,
  } = req.body;

  try {
    const updatedRadioProgram = await RadioProgramsService.updateRadioProgram(id, {
      titleMain,
      date,
      introduction,
      image,
      audio,
      multimedia,
      labels,
      extraData,
    });

    res.status(200).json(updatedRadioProgram);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar el programa de radio.";
    return res.status(status).json({ message });
  }
};


const desactivateRadioProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await RadioProgramsService.deactivateRadioProgram(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al desactivar el programa de radio.";
    return res.status(status).json({ message });
  }
};


const activateRadioProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await RadioProgramsService.activateRadioProgram(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar el programa de radio.";
    return res.status(status).json({ message });
  }
};


const deleteRadioProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await RadioProgramsService.deleteRadioProgram(id);
    res.status(204).json(result);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al borrar el programa de radio.";
    return res.status(status).json({ message });
  }
};


module.exports = {
  getRadioPrograms,
  getActiveRadioPrograms,
  getRadioProgramById,
  getActiveRadioProgramById,
  postRadioProgram,
  putRadioProgram,
  desactivateRadioProgram,
  activateRadioProgram,
  deleteRadioProgram
};