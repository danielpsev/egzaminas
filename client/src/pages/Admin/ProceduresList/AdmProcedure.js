import React from "react";
import AdminCSS from '../Admin.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function AdmProcedure(props) {
    const navigate = useNavigate();
    const {obj, deleteProcedure} = props;
    const {_id, title, duration, category, imgSrc} = obj;

    const title_sub = title.length > 18 ? title.substring(0, 18) + "...": title;
    return (
    <tr>
        <td><img src={imgSrc.substr(0, 4) == 'http' ? imgSrc : '../' + imgSrc} alt={title} className={`${AdminCSS.tableImg} pointer`} onClick={() => navigate(`/procedure/${_id}`)}/></td>
        <td>{title_sub}</td>
        <td>{category}</td>
        <td>{duration}</td>
        <td><AiFillEdit className={AdminCSS.tableActionIcon} title="Redaguoti" onClick={() => navigate(`/admin/procedure/edit/${_id}`)}/> <AiFillDelete className={AdminCSS.tableActionIcon} title="Ištrinti" onClick={() => deleteProcedure(_id)}/> </td>
    </tr>
    );
}
