import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Procedure.module.css";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { likeProcedure, dislikeProcedure } from "../../func.js";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuth } from "../../context/Auth";
export default function ProcedurePage() {
  const auth = useAuth();
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
        navigate('/');
      }
    };
    getProcedure();
  }, [path]);
  const {
    _id,
    title,
    category,
    duration,
    imgSrc,
  } = procedure;

  return (
    <main>
      <style>
        {`.App::before {
          background-image: url(${imgSrc && imgSrc.substr(0, 4) == 'http' ? imgSrc : '../' + imgSrc}) !important;
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
                      src={imgSrc.substr(0, 4) == 'http' ? imgSrc : '../' + imgSrc}
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
                    <div className={style.ProcedureRightSideContainer__detailsBox}>
                      <div>
                        <p className="nowrap">
                          Kategorija: <b>{category}</b>
                        </p>
                        <p className="nowrap">
                          Trukmė <b>{duration} min.</b>
                        </p>
                      </div>


                        <form>
                          <input type="date"/>
                          <button
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
