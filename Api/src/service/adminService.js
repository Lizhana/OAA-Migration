const { AdminsSchema } = require("../db");
const bcrypt = require('bcrypt')
const { sendEmail }= require('../utils/email.utils')

const getAdmins = async () => {
  try {
    const admins = await AdminsSchema.findAll();
    return admins.reverse();
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al obtener a los administradores.");
  }
};

const getAdminById = async (id) => {
  try {
    const admin = await AdminsSchema.findByPk(id);
    if (!admin) {
      throw new Error("No se encontró al administrador");
    }
    return admin;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al obtener al administrador");
  }
};

const createAdmin = async (name, email, passwordHash) => {
  try {
    const createdAdmin = await AdminsSchema.create({
      name,
      email,
      password: passwordHash,
    });
    return createdAdmin;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error.");
  }
};

const deleteAdminById = async (id) => {
  const deletedAdmin = await AdminsSchema.findByIdAndRemove(id);
  return deletedAdmin;
};

const findAdminByEmail = async (email) => {
  try {
    const admin = await AdminsSchema.findOne({ where: { email } });
    return admin;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error.");
  }
};

const updateAdmin = async (id, name, email) => {
  try {
    const existAdmin = await AdminsSchema.findOne({ where: { email } });
    if (existAdmin && existAdmin.id !== id) {
      throw {
        status: 409,
        message: `Ya existe una cuenta de administrador con el email: ${email}`,
      };
    }

    const [updatedRows] = await AdminsSchema.update(
      { name, email },
      { where: { id } }
    );

    if (updatedRows === 0) {
      throw {
        status: 404,
        message: `El administrador con ID ${id} no fue encontrado`,
      };
    }

    const updatedAdmin = await AdminsSchema.findOne({ where: { id } });
    return {
      _id: updatedAdmin.id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      createdAt: updatedAdmin.createdAt,
    };
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar al administrador";
    throw { status, message };
  }
};

const generateRandomNumber = () => {
  return `${Math.floor(Math.random() * 1000000)}`;
};

const resetPassword = async (email) => {
  try {
    const passwordReset = generateRandomNumber();
    const passwordHash = bcrypt.hashSync(passwordReset, 8);

    const updatedAdmin = await AdminsSchema.findOne(
      { where: { email } }
    );

    if (!updatedAdmin) {
      throw {
        status: 404,
        message: `El administrador con el email ${email} no fue encontrado.`,
      };
    } 
    updatedAdmin.password = passwordHash; // Actualiza el campo password con el valor de passwordHash
    await updatedAdmin.save();

    await sendEmail(
      email,
      "Reestablece tu contraseña",
      "¡Hola! Estás recibiendo este correo porque hiciste una solicitud de reestablecimiento de contraseña.",
      `<h2 style="text-align: center">Reestablecimiento de contraseña</h2>
      <p>
        ¡Hola! Estás recibiendo este correo porque hiciste una solicitud de
        reestablecimiento de contraseña. Por favor realice los siguientes pasos:
      </p>
      <ol>
        <li>
          <p>
            El código que aparece a continuación es su nueva contraseña para
            poder iniciar sesión.
          </p>
        </li>
        <li>
          <p>
            Una vez que hayas iniciado sesión dirígete a la sección de
            "modificar contraseña" y establece una nueva.
          </p>
        </li>
      </ol>
      <p style="text-align: center; font-size: 2rem; color: white">
        <b
          style="
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #528f43;
          "
        ><span style="padding-right: 0.5rem">${passwordReset.substring(
          0,
          3
        )}</span><span>${passwordReset.substring(3, 6)}</span></b>
      </p>
      <p>
        Si usted no realizó esta solicitud, inicie sesión con el código que
        aparece en este correo y modifique inmediatamente su contraseña.
      </p>
      <p style="font-weight: 600">
        ** Recuerde que por su seguridad este correo es confidencial y no debe
        ser compartido ni reenviado. **
      </p>`
    );

    return updatedAdmin;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reestablecer la contraseña.";
    throw { status, message };
  }
};

const updateAdminPassword = async (id, passwordHash) => {
  try {
    const [updatedCount, updatedAdmin] = await AdminsSchema.update(
      { password: passwordHash },
      { where: { id }, returning: true }
    );
    if (updatedCount === 0) {
      throw new Error(`El administrador con el email ${id} no fue encontrado.`);
    }
    return updatedAdmin[0];
  } catch (error) {
    throw error;
  }
};

const editPassword = async (id, password) => {
  try {
    const passwordHash = bcrypt.hashSync(password, 8);

    const updatedAdmin = await AdminsSchema.findByIdAndUpdate(id, {
      password: passwordHash,
    });

    if (!updatedAdmin) {
      throw {
        status: 404,
        message: `El administrador con el ID ${id} no fue encontrado.`,
      };
    }

    await sendEmail(
      updatedAdmin.email,
      "Contraseña actualizada con éxito",
      "¡Hola! Estás recibiendo este correo porque tu contraseña ha sido actualizada con éxito.",
      `<h2>¡Hola, ${updatedAdmin.name}!</h2>
      <p>
        Queremos informarte que tu contraseña ha sido actualizada exitosamente.
      </p>
      <p>Si realizaste esta acción, puedes ignorar este correo.</p>
      <p>
        En caso de que desconozcas el origen de esta acción, dirígete
        inmediatamente a la página de
        <a href="https://www.google.com.ar/">inicio de sesión para administradores</a>,
        introduce tu correo y haz clic en "He olvidado mi contraseña".
      </p>
      <p>
        Una vez que realices esto, te llegará por correo tu nueva
        contraseña junto con los siguientes pasos que debes seguir.
      </p>
      <p>Saludos, equipo de OAA.</p>
      <p style="font-weight: 600">** Por favor no respondas a este correo. **</p>`
    );

    return updatedAdmin;
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reestablecer la contraseña.";
    throw { status, message };
  }
};

module.exports = {
  getAdmins,
  getAdminById,
  createAdmin,
  deleteAdminById,
  findAdminByEmail,
  updateAdmin,
  resetPassword,
  updateAdminPassword,
  editPassword,
};
