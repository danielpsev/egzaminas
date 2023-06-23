import React, {useState} from "react";
import style from './Main.module.css';
import {BsFillPlayCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import '../../style/main.css'; 
import { useAuth } from "../../context/Auth";
export default function Procedure(props) {
    const navigate = useNavigate();
    const auth = useAuth();
    const {obj} = props;
    const {_id, title, category, duration, imgSrc} = obj;

    const title_sub = title.length > 18 ? title.substring(0, 18) + "...": title;
    return (
    <div className={style.MainProcedureContainer}>
        <img className={style.MainProcedureContainer__img} src={imgSrc} alt={title}/>
        <div onClick={() => navigate(`/procedure/${_id}`)} className={style.MainProcedureContainer__overlay}><BsFillPlayCircleFill className={style.MainProcedureContainer__overlay__playIcon}/></div>
        <div className={style.MainProcedureContainer__ratingBox}>Trukmė</div>
        <div className={style.MainProcedureContainer__infoContainer}>
        <h3 className={style.MainProcedureContainer__infoContainer__title} title={title}>{title_sub}</h3>
        <h4 className={style.MainProcedureContainer__infoContainer__details}> {category} .Trukmė {duration} min.</h4>
        </div>

    </div>
    );
}
