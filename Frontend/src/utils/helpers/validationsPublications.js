export default function validationsPublications(form) {
  const errors = {};

  if (!form.titleMain) {
    errors.titleMain = "Por favor, introduce un título.";
  } else if (!form.date) {
    errors.date =
      "Por favor, introduce la fecha del acontecimiento ó, en su defecto, la fecha actual.";
  } else if (!form.category) {
    errors.category = "Por favor, introduce una categoría válida.";
  } else if (!form.author) {
    errors.author = "Por favor, introduce el autor de la publicación.";
  } else if (!form.introduction) {
    errors.introduction =
      "Por favor, introduce una breve introducción de la publicación.";
  }

  return errors;
}
