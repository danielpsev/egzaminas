import React, { useEffect, useState } from "react";
import ProceduresList from "./ProceduresList";
import axios from "../../axios";
import Filters from "../../components/Filters/Filters";
import MainCSS from "./Main.module.css";
const Main = () => {
  const [procedures, setProcedures] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState("");
  const getProcedures = async (page, filters) => {
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
    getProcedures(currPage, filters);
  }, [currPage, filters]);
  return (
    <main>
      <div className="wrapper">
        <div className={`main-inner ${MainCSS.MainInner}`}>

          <Filters
            getProcedures={getProcedures}
            setProcedures={setProcedures}
            setFilters={setFilters}
          />
          <ProceduresList
            getProcedures={getProcedures}
            procedures={procedures}
            setProcedures={setProcedures}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
