import React from "react";
import axios from "../../axios";
import AdminCSS from "./Admin.module.css";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";
import { procedureValidation } from "../../func";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdmAddProcedure = () => {
  const navigate = useNavigate();
  const validate = (values) => {
    let errors = procedureValidation(values);
    return errors;
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("/procedures/", values);
      formik.resetForm();
      toast.success("Procedūra sėkmingai sukurta");
      navigate("?type=procedures_list", { replace: true });
    } catch (err) {
      console.log(err);
      console.log(err.response.data.mess);
      toast.error(`Klaida. ${err.response.data.mess}`);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      duration: "",
      imgSrc: "",
    },
    onSubmit,
    validate,
  });
  return (
    <div className={`${AdminCSS.addProcedureInner} mh-50vh`}>
      <div className={AdminCSS.addProcedureContainer}>
        <div className={AdminCSS.addProcedureContent}>
          <h3 className={`${AdminCSS.addProcedure__title} text-color-second`}>
            Procedūros pridėjimas
          </h3>
          <form
            noValidate
            className={AdminCSS.addProcedureForm}
            onSubmit={formik.handleSubmit}
          >
            <p>
              <label className="text-color-second" htmlFor="title">
                Procedūros pavadinimas
              </label>
            </p>
            <input
              className={` ${
                formik.touched.title && formik.errors.title ? "error" : ""
              }`}
              type="text"
              id="title"
              name="title"
              placeholder="Procedūros pavadinimas"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="error-mess-box">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.title}</span>
              </div>
            ) : null}

            <p>
              <label className="text-color-second" htmlFor="category">
                Kategorija
              </label>
            </p>
            <input
              className={` ${
                formik.touched.category && formik.errors.category ? "error" : ""
              }`}
              type="text"
              id="category"
              name="category"
              placeholder="Kategorija"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="error-mess-box">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.category}</span>
              </div>
            ) : null}

            <p>
              <label className="text-color-second" htmlFor="duration">
                Trukmė (min)
              </label>
            </p>
            <input
              className={` ${
                formik.touched.duration && formik.errors.duration ? "error" : ""
              }`}
              type="number"
              id="duration"
              name="duration"
              placeholder="Trukmė"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
            />
            {formik.touched.duration && formik.errors.duration ? (
              <div className="error-mess-box">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.duration}</span>
              </div>
            ) : null}

            <p>
              <label className="text-color-second" htmlFor="imgSrc">
                Paveikslėlio nuoroda
              </label>
            </p>
            <input
              className={` ${
                formik.touched.imgSrc && formik.errors.imgSrc ? "error" : ""
              }`}
              type="text"
              id="imgSrc"
              name="imgSrc"
              placeholder="Paveikslėlio nuoroda"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imgSrc}
            />
            {formik.touched.imgSrc && formik.errors.imgSrc ? (
              <div className="error-mess-box">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.imgSrc}</span>
              </div>
            ) : null}

            <button
              type="submit"
              className={`${AdminCSS.addProcedureBtn} btn btn-success float-right`}
            >
              Pridėti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmAddProcedure;
