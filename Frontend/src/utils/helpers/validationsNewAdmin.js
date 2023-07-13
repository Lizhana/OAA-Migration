export default function validationsNewAdmin(form) {
  const errors = {};
  const regexName = /^[ A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/i;
  const regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!form.name) {
    errors.name = "Por favor, introduce un nombre.";
  } else if (!regexName.test(form.name)) {
    errors.name = "Por favor, introduce un nombre válido.";
  } else if (!form.email) {
    errors.email = "Por favor, introduce un correo electrónico.";
  } else if (!regexEmail.test(form.email)) {
    errors.email = "Por favor, introduce un correo electrónico válido.";
  }

  return errors;
}
