export function validationsUrl(url) {
  const errors = {};
  const regexName = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
  if (!regexName.test(url)) {
    errors.url = "Por favor, introduce una url válida.";
  }
  return errors;
}
