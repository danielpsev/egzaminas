import React, {useState} from "react";
import { formatDate } from "../../func";
export default function Reservation(props) {
    const {obj} = props;
    const {procedure, date, status} = obj;

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
    <div className="profile-reservation-container">
        <h2>{procedure.title}</h2>
        <p>Data: {formatDate(date)}</p>
        <p>Statusas: {displayStatus()}</p>
    </div>
    );
}
