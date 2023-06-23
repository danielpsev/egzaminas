export const formatDate = (date) => {
  date = new Date(date);
  let m = String(date.getMonth() + 1).padStart(2, "0"); // month with leading zero
  let d = String(date.getDate()).padStart(2, "0"); // day with leading zero
  let y = date.getFullYear(); // year
  return `${y}-${m}-${d}`;
};

export const errMessage = (type, field, value) => {
    let mess = "Klaida";
    switch (type) {
      case "required":
        mess = `Prašome užpildyti laukelį (${field})`;
        break;
      case "min_symbols":
        mess = `${field} turi būti min. ${value} simbolių!`;
        break;
      case "max_symbols":
        mess = `${field} turi būti max. ${value} simbolių!`;
        break;
    }
    return mess;
  };

  export const procedureValidation = (values) => {
    let errors = {};
    const { title, category, duration, imgSrc} = values;
    if (!title) {
      errors.title = errMessage("required", "Pavadinimas");
    } else if (title.length < 2) {
      errors.title = errMessage("min_symbols", "Pavadinimas", 2);
    } else if (title.length > 40) {
      errors.title = errMessage("max_symbols", "Pavadinimas", 40);
    } 


    if (!category) {
      errors.category = errMessage("required", "Kategorija");
    } else if (category.length < 2) {
      errors.category = errMessage("min_symbols", "Kategorija", 2);
    } else if (category.length > 30) {
      errors.category = errMessage("max_symbols", "Kategorija", 20);
    }


    if (!duration) {
      errors.duration = errMessage("required", "Trukmė");
    } else if (duration <= 0) {
      errors.duration = `Trukmė negali būti trumpesn4 už 1 min`;
    } else if (duration > 500) {
      errors.duration = `Trukmė negali būti ilgesnė nei 300 min`;
    }

    if (!imgSrc) {
      errors.imgSrc = errMessage("required", "Paveikslėlio nuoroda");
    } 


    return errors;
  };