import axios from "./axios"
import { toast } from "react-toastify";
export const likeFilm = async (id, setState) => {
        setState(true);
        try{
            const res = await axios.post("/films/like/" + id);
          }catch(err){
            setState(false);
            toast.error(err.response.data.mess);
          }
}
export const dislikeFilm = async (id, setState) => {
    setState(false);
    try{
      const res = await axios.delete("/films/like/" + id);
    }catch(err){
      setState(true);
      toast.error(err.response.data.mess);
    }
  }

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
    } else if (category.length > 20) {
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