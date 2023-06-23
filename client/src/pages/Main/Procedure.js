import React, {useState} from "react";
import MainCSS from './Main.module.css';
import {BsFillPlayCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import '../../style/main.css'; 
import { useAuth } from "../../context/Auth";
export default function Film(props) {
    const navigate = useNavigate();
    const auth = useAuth();
    const {obj} = props;
    const {_id, title, category, duration, imgSrc} = obj;

    const title_sub = title.length > 18 ? title.substring(0, 18) + "...": title;
    return (
    <div className={MainCSS.MainFilmContainer}>
        <img className={MainCSS.MainFilmContainer__img} src={imgSrc} alt={title}/>
        <div onClick={() => navigate(`/procedure/${_id}`)} className={MainCSS.MainFilmContainer__overlay}><BsFillPlayCircleFill className={MainCSS.MainFilmContainer__overlay__playIcon}/></div>
        <div className={MainCSS.MainFilmContainer__ratingBox}>Trukmė</div>
        <div className={MainCSS.MainFilmContainer__infoContainer}>
        <h3 className={MainCSS.MainFilmContainer__infoContainer__title} title={title}>{title_sub}</h3>
        <h4 className={MainCSS.MainFilmContainer__infoContainer__details}> {category} .Trukmė {duration} min.</h4>
        </div>

    </div>
    );
}
