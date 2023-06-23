import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Procedure.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../axios";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";

export default function ProcedurePage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [procedure, setProcedure] = useState({});
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  useEffect(() => {
    setIsLoading(true);
    const getProcedure = async () => {
      try {
        const res = await axios.get("/procedures/" + path);
        setProcedure(res.data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response.data.mess);
        navigate("/");
      }
    };
    getProcedure();
  }, [path]);
  const { _id, title, category, duration, imgSrc } = procedure;

  const validate = (values) => {
    let errors = {};

    if (!values.date) {
      errors.date = "Prašome užpildyti laukelį (Data)";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("/reservations/" + _id, values);
      formik.resetForm();
      toast.success("Rezervacija sėkminga");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      console.log(err.response.data.mess);
      toast.error(`Klaida. ${err.response.data.mess}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    onSubmit,
    validate,
  });

  return (
    <main>
      <style>
        {`.App::before {
          background-image: url(${
            imgSrc && imgSrc.substr(0, 4) == "http" ? imgSrc : "../" + imgSrc
          }) !important;
          background-size: cover;
        }`}
      </style>
      <div className="wrapper">
        <div>
          <div className={style.ProcedureCover}>
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
                <div className={style.ProcedureCover__overlay}></div>
                <section className={style.ProcedureContainer}>
                  <div className={style.PosterBox}>
                    <img
                      className={style.ProcedureContainer__img}
                      alt="poster"
                      src={
                        imgSrc.substr(0, 4) == "http" ? imgSrc : "../" + imgSrc
                      }
                    />
                    {/* <div className={style.RatingBox}>
                      <AiFillStar className={style.RatingBox__star} />
                      <h3 className={style.RatingBox__rate}>{rating}</h3>
                    </div> */}
                  </div>
                  <div className={style.ProcedureContainer__RightSideContainer}>
                    <h2 className={style.ProcedureRightSideContainer__title}>
                      {title}
                    </h2>
                    <div
                      className={style.ProcedureRightSideContainer__detailsBox}
                    >
                      <div>
                        <p className="nowrap">
                          Kategorija: <b>{category}</b>
                        </p>
                        <p className="nowrap">
                          Trukmė <b>{duration} min.</b>
                        </p>
                      </div>

                      <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                        className={style.regDateForm}
                      >
                        <p>
                          <label className="text-color-second" htmlFor="date">
                            Registracijos data
                          </label>
                        </p>
                        <input
                          className={` ${
                            formik.touched.date && formik.errors.date
                              ? "error"
                              : ""
                          }`}
                          type="date"
                          id="date"
                          name="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                        />
                        {formik.touched.date && formik.errors.date ? (
                          <div className="error-mess-box">
                            <AiFillWarning className="error-mess-icon" />
                            <span>{formik.errors.date}</span>
                          </div>
                        ) : null}
                        <button
                          type="submit"
                          className={`btn btn-success ${style.ProcedureRightSideContainer__detailsBtn}`}
                        >
                          Registruotis
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
