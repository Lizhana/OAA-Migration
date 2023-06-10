const adminsService = require("../service/adminService");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email.utils");
const AdminSchema = require('../db')

const getAdmin = async (req, res) => {
  try {
    const admins = await adminsService.getAdmins();
    return res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener a los administradores.";
    return res.status(status).json({ message });
  }
};

const getAdminsById = async (req, res) => {
  try {
    const admin = await adminsService.getAdminById(req.params.id);
    return res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener al administrador";
    return res.status(status).json({ message });
  }
};

const generateRandomNumber = () => {
  return `${Math.floor(Math.random() * 1000000)}`;
};

const postAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = generateRandomNumber();
    const passwordHash = bcrypt.hashSync(password, 8);

    const existAdmin = await adminsService.findAdminByEmail(email);
    if (existAdmin) {
      return res.status(409).json({
        message: `Ya existe una cuenta de administrador con el email: ${email}`,
      });
    }

    const createdAdmin = await adminsService.createAdmin(
      name,
      email,
      passwordHash
    );

    await sendEmail(
      email,
      "Bienvenido a OAA",
      "¡Hola! Estás recibiendo este correo porque ahora eres administrador de OAA.",
      `<h2 style="text-align: center">Bienvenido a OAA</h2>
      <p>
        ¡Hola, ${name}! Es de nuestro agrado informarte que ahora formas parte del equipo
        de administradores de OAA. Por favor realiza los siguientes pasos:
      </p>
      <ol>
        <li>
          <p>
            El código que aparece a continuación es tu nueva contraseña para
            poder iniciar sesión.
          </p>
        </li>
        <li>
          <p>
            Una vez que hayas iniciado sesión, dirígete a la sección de
            "modificar contraseña" y establece una nueva.
          </p>
        </li>
      </ol>
      <p style="text-align: center; font-size: 2rem; color: white">
        <b style="
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          background-color: #528f43;
        ">
          <span style="padding-right: 0.5rem">${password.substring(0, 3)}</span>
          <span>${password.substring(3, 6)}</span>
        </b>
      </p>
      <p>
        Saludos cordiales de parte del equipo de Organización de Ambientalistas Autoconvocados.
      </p>
      <p style="font-weight: 600">
        ** Recuerda que, por tu seguridad, este correo es confidencial y no debe ser compartido ni reenviado. No respondas a este correo. **
      </p>`
    );

    res.status(200).json(createdAdmin);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear una nueva cuenta de administrador";
    return res.status(status).json({ message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await adminsService.deleteAdminById(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).send({ message: "No se encontró al usuario" });
    }
    res.send({ message: "El administrador fue eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar al administrador" });
  }
};

const logAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminsService.findAdminByEmail(email) // Busca el administrador por correo electrónico
    if (!admin) {
      return res.status(404).json({ message: 'Email incorrecto.' });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(404).json({ message: 'Contraseña incorrecta.' });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || 'Ocurrió un error al iniciar sesión.';
    return res.status(status).json({ message });
  }
};

// const logAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await adminsService.findAdminByEmail(email);
//     if (!admin) {
//       return res.status(404).json({ message: "Email incorrecto." });
//     }
//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) {
//       return res.status(404).json({ message: "Contraseña incorrecta." });
//     }
//     return res.status(200).json(admin);
//   } catch (error) {
//     console.error(error);
//     const status = error.status || 500;
//     const message = error.message || "Ocurrió un error al iniciar sesión.";
//     return res.status(status).json({ message });
//   }
// };

const putAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedAdmin = await adminsService.updateAdmin(id, name, email);

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar al administrador";
    return res.status(status).json({ message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedAdmin = await adminsService.resetPassword(email);

    return res.status(200).json({
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      password: updatedAdmin.password,
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reestablecer contraseña";
    return res.status(status).json({ message });
  }
};

const editPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const updatedAdmin = await adminsService.editPassword(id, password);

    return res.status(200).json({
      id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      password: updatedAdmin.password,
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reestablecer contraseña.";
    return res.status(status).json({ message });
  }
};

module.exports = {
  getAdmin,
  getAdminsById,
  postAdmin,
  deleteAdmin,
  logAdmin,
  putAdmin,
  resetPassword,
  editPassword,
  generateRandomNumber
};