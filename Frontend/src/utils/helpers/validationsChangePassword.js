export default function validationsChangePassword(form) {
  const errors = {};

  if (!form.password) {
    errors.password = "Por favor, introduce una nueva contraseña.";
  } else if (!form.repeatPassword) {
    errors.repeatPassword = "Por favor, repite la contraseña.";
  } else if (form.repeatPassword !== form.password) {
    errors.repeatPassword = "Las contraseñas deben ser iguales.";
  }

  return errors;
}
