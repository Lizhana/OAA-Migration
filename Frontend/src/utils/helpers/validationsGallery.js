export default function validationsGallery(form) {
  const errors = {};

  if (!form.titleMain) {
    errors.titleMain = "Por favor, introduce un título.";
  } else if (!form.date) {
    errors.date =
      "Por favor, introduce la fecha del acontecimiento ó, en su defecto, la fecha actual.";
  } else if (!form.author) {
    errors.author = "Por favor, introduce el autor del video.";
  }

  return errors;
}
