export default function validationsRadioProgram(form) {
  const errors = {};

  if (!form.titleMain) {
    errors.titleMain = "Por favor, introduce un título.";
  }

  return errors;
}
