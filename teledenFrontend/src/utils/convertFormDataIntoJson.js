export default function convertFormDataIntoJson(formData) {
  if (formData) {
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    return object;
  }
}
