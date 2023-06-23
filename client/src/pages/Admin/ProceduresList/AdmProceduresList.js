import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Filters from "../../../components/Filters/Filters";
import AdmProceduresTable from "./AdmProceduresTable";
import AdminCSS from "../Admin.module.css";

const AdmProceduresList = () => {
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [procedures, setProcedures] = useState([]);
  const [filters, setFilters] = useState('');
  const getProcedures = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/procedures?${filters}`);
      if (res.data.status != "error") {
        setProcedures(res.data.data.procedures);
      } else {
        setProcedures([]);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  useEffect(() => {
    getProcedures(currPage);
  }, [currPage, filters]);

  return (
        <div className={`${AdminCSS.FilmsListInner} main-inner mh-50vh`}>
         <Filters
            getFilms={getProcedures}
            setFilms={setProcedures}
            setFilters={setFilters}
            setCurrPage={setCurrPage}
          />
          <AdmProceduresTable isLoading={isLoading} procedures={procedures} getProcedures={getProcedures}/>
        </div>
  );
};

export default AdmProceduresList;
