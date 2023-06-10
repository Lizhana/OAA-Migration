const { Router } = require("express");
const adminRouter = Router();
const admin = require("../../controllers/adminControllers");

// ---- GET *
adminRouter.get("/", admin.getAdmin); //----->  Trae a todos los administradores  | http://localhost:3001/admin/

adminRouter.get("/data/:id", admin.getAdminsById); //----->  Trae a un administrador por id  | http://localhost:3001/admin/data/:id

//----POST *
// IMPORTANTE: al crear un nuevo administrador se envia un mail al correo que se ingresó, cuidado con los mails que ingresan al hacer pruebas
adminRouter.post("/", admin.postAdmin); // ----> POST http://localhost:3001/admin   { "name": "Nombre Apellido", "email": "nombre@gmail.com" }
//                                                                         el password se crea solo, no hay que agregarlo

//----PUT *
adminRouter.put("/log", admin.logAdmin); //----->  PUT http://localhost:3001/admin/log { "email": "nombre@gmail.com", "password": "1234" }

adminRouter.put("/data/:id", admin.putAdmin); //----> PUT http://localhost:3001/admin/data/:id - Solo para editar name y/o email

adminRouter.put("/password", admin.resetPassword); // --> PUT http://localhost:3001/admin/password - Para reestablecer una contraseña sin iniciar sesión (porque se le olvidó cual era) { "email": ""}
// IMPORTANTE: al cambiar la contraseña se envia un mail al correo que se ingresó, cuidado con los mails que ingresan al hacer pruebas

adminRouter.put("/password/:id", admin.editPassword); // --> PUT http://localhost:3001/admin/password/:id - Para reestablecer una contraseña con la sesión iniciada
// IMPORTANTE: al cambiar la contraseña se envia un mail al correo que se ingresó, cuidado con los mails que ingresan al hacer pruebas

//----DELETE *
adminRouter.delete("/:id", admin.deleteAdmin); // ---> http://localhost:3001/admin/:id

module.exports = adminRouter;
