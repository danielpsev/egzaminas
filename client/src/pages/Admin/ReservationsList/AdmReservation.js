import React from "react";
import AdminCSS from '../Admin.module.css';
import { formatDate } from "../../../func";
import {MdOutlineDone} from "react-icons/md";
import {ImCancelCircle} from "react-icons/im";

export default function AdmReservation(props) {
    const {obj, cancelReservation, acceptReservation} = props;
    const {_id, user, procedure, status, date} = obj;

    const displayStatus = () => {
        let mess;
        switch(status){
            case 0:
                mess = 'Laukia patvirtinimo';
                break;
            case 1:
                mess = 'Patvirtintas';
                break;
            case 2:
                mess = 'Atšauktas';
                break;
        }
        return mess;
    }
    return (
    <tr>
        <td>{user.username}</td>
        <td>{procedure.title}</td>
        <td>{displayStatus()}</td>
        <td> {formatDate(date)}</td>
        <td><MdOutlineDone className={AdminCSS.tableActionIcon} title="Patvirtinti"  onClick={() => acceptReservation(_id)}/> <ImCancelCircle className={AdminCSS.tableActionIcon} title="Atšaukti" onClick={() => cancelReservation(_id)}/> </td>
    </tr>
    );
}
