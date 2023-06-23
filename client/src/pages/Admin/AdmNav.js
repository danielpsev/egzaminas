import React from "react";
import AdminCSS from "./Admin.module.css";
const AdmNav = (props) => {
  const { funcShowPage, showPage } = props;
  return (
    <nav className={AdminCSS.NavContainer}>
      <button
        className={
          showPage == "reservations_list"
            ? "Admin-nav-item btn btn-success"
            : "Admin-nav-item btn btn-primary"
        }
        onClick={() => funcShowPage("reservations_list")}
      >
        Rezervacijų sąrašas
      </button>
      <button
        className={
          showPage == "procedures_list"
            ? "Admin-nav-item btn btn-success"
            : "Admin-nav-item btn btn-primary"
        }
        onClick={() => funcShowPage("procedures_list")}
      >
        Procedūrų sąrašas
      </button>
      <button
        className={
          showPage == "add_procedure"
            ? "Admin-nav-item btn btn-success"
            : "Admin-nav-item btn btn-primary"
        }
        onClick={() => funcShowPage("add_procedure")}
      >
        Pridėti procedūrą
      </button>
    </nav>
  );
};
export default AdmNav;
