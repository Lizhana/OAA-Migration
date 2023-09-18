const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const regexName = /[.!@#$%^&*()_+-=]/;

export const validateNewsletter = (input) => {
  let errors = {};
  if (!input.name.length) {
    errors.name = "El nombre es requerido.";
  } else if (6 > input.name.length > 30) {
    errors.name = "El nombre debe tener entre 6 y 30 caracteres";
  } else if (regexName.test(input.name)) {
    errors.name = "El nombre no puede tener números o caracteres especiales";
  }
  if (!input.email.length) {
    errors.email = "El email es requerido.";
  } else if (!regexEmail.test(input.email)) {
    errors.email = "El email debe ser válido";
  }
  return errors;
};