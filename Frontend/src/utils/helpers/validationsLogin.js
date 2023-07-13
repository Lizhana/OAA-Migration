export default function validationsLogin(form) {
  const errors = {};
  const regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!form.email) {
    errors.email = "Por favor, introduce tu correo electrónico.";
  } else if (!regexEmail.test(form.email)) {
    errors.email = "Por favor, introduce un correo electrónico válido.";
  } else if (!form.password) {
    errors.password = "Por favor, introduce tu contraseña.";
  }

  return errors;
}
