import React, { useEffect, useState } from "react";
import axios from "../../axios";
import AdmNav from "./AdmNav";
import AdmAddProcedure from "./AdmAddProcedure";
import AdmProceduresList from "./ProceduresList/AdmProceduresList";
import { useNavigate, useLocation } from "react-router-dom";
const Admin = () => {
  const [showPage, setShowPage] = useState("procedures_list");
  const navigate = useNavigate();
  const location = useLocation();

  const funcShowPage = (title) => {
    setShowPage(title);
    navigate("?type=" + title, { replace: true });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    if (type == "procuderes_list" || type == "add_procedure") {
      setShowPage(type);
    }
  }, [location.search]);
  return (
    <main>
      <div className="wrapper">
        <AdmNav funcShowPage={funcShowPage} showPage={showPage} />
        {showPage == "procedures_list" ? <AdmProceduresList /> : null}
        {showPage == "add_procedure" ? <AdmAddProcedure /> : null}
      </div>
    </main>
  );
};

export default Admin;
