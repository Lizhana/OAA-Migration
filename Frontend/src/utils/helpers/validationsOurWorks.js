export default function validationsOurWorks(form) {
  const errors = {};

  if (!form.titleMain) {
    errors.titleMain = "Por favor, introduce un título.";
  }

  return errors;
}
