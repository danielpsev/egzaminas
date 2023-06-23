import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import ProcedureCSS from "../Procedure/Procedure.module.css";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { procedureValidation } from "../../func.js";
import { useFormik } from "formik";
import AdminCSS from "./Admin.module.css";
export default function AdmEditProcedure() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname.split("/")[4];
  useEffect(() => {
    setIsLoading(true);
    const getProcedure = async () => {
      try {
        const res = await axios.get("/procedures/" + path);
        const {
          _id,
          title,
          category,
          duration,
          imgSrc,
        } = res.data;
        formik.setValues({
          title,
          category,
          duration,
          imgSrc,
        });
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.mess);
        // navigate('/');
      }
    };
    getProcedure();
  }, [path]);

  const validate = (values) => {
    let errors = procedureValidation(values);
    return errors;
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.patch("/procedures/" + path, values);
      toast.success("Procedūra sėkmingai atnaujinta");
      navigate("/admin/?type=procedures_list", { replace: true });
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
    <main>
      <div className="wrapper">
        <div>
          <div className={ProcedureCSS.ProcedureCover}>
            {isLoading ? (
              <BeatLoader
                color="#3474eb"
                margin={15}
                size={40}
                cssOverride={{
                  textAlign: "center",
                }}
              />
            ) : (
              <>
                <div className={ProcedureCSS.ProcedureCover__overlay}></div>
                <h3 className={`${AdminCSS.editProcedureTitle} text-color-second`}>
                  Procedūros redagavimas
                  <button
                    className={`${AdminCSS.editProcedureBackBtn} btn btn-type-2 btn-secondary`}
                    onClick={() => navigate(`/admin/?type=Procedures_list`)}
                    title="Atgal"
                  >
                    Atgal
                  </button>
                </h3>
                <section className={ProcedureCSS.ProcedureContainer}>
                  <form
                    noValidate
                    className={AdminCSS.editProcedureForm}
                    onSubmit={formik.handleSubmit}
                  >
                    <p>
                      <label className="text-color-second" htmlFor="title">
                        Procedūros pavadinimas
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.title && formik.errors.title
                          ? "error"
                          : ""
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
                        formik.touched.category && formik.errors.category
                          ? "error"
                          : ""
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
                        formik.touched.duration && formik.errors.duration
                          ? "error"
                          : ""
                      }`}
                      type="number"
                      id="duration"
                      name="duration"
                      placeholder="Trukmė minutėmis"
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
                        Nuotraukos nuoroda
                      </label>
                    </p>
                    <input
                      className={` ${
                        formik.touched.imgSrc && formik.errors.imgSrc
                          ? "error"
                          : ""
                      }`}
                      type="text"
                      id="imgSrc"
                      name="imgSrc"
                      placeholder="Nuotraukos nuoroda"
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
                    <img
                      className="mt-10"
                      src={
                        formik.values.imgSrc.substr(0, 4) == "http"
                          ? formik.values.imgSrc
                          : "../../../" + formik.values.imgSrc
                      }
                      width="100px"
                      alt="nuotrauka"
                    />
                   
                    <button
                      type="submit"
                      className={`${AdminCSS.editProcedureSaveBtn} btn btn-success float-right mt-10`}
                    >
                      Išsaugoti
                    </button>
                  </form>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
