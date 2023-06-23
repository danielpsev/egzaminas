import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import AdmReservationsTable from "./AdmReservationsTable";
import AdminCSS from "../Admin.module.css";

const AdmReservationsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const getReservations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/reservations`);
      console.log(res);
      if (res.data.status != "error") {
        setReservations(res.data.data.reservations);
      } else {
        setReservations([]);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  useEffect(() => {
    getReservations();
  }, []);

  return (
        <div className={`${AdminCSS.FilmsListInner} main-inner mh-50vh`}>
          <AdmReservationsTable isLoading={isLoading} reservations={reservations} getReservations={getReservations}/>
        </div>
  );
};

export default AdmReservationsList;
