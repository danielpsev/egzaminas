import React from "react";
import AdmProcedure from "./AdmProcedure";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import AdminCSS from "../Admin.module.css";
export default function AdmProceduresTable(props) {
  const { procedures, isLoading, getProcedures} = props;

  const deleteProcedure = async (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti procedūrą?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D83C3E",
        cancelButtonColor: "#1e273d",
        confirmButtonText: "Ištrinti",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete("/procedures/" + id);
            swal.fire({
              title: "Sėkmingai",
              text: "Procedūra ištrinta",
              icon: "success",
              confirmButtonColor: "#3BA55B",
            });
            getProcedures();
          } catch (err) {
            console.log(err);
            toast.error(err.response.data.mess);
          }
        }
      });
  }


  let procedures_render = procedures.map((el) => {
    return <AdmProcedure obj={el} key={uuidv4()} deleteProcedure={deleteProcedure} />;
  });



  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pavadinimas</th>
            <th>Kategorija</th>
            <th>Trukmė</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                <BeatLoader
                  color="#3474eb"
                  margin={15}
                  size={40}
                  cssOverride={{
                    textAlign: "center",
                    display: "block",
                  }}
                />
              </td>
            </tr>
          ) : procedures_render.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Nerasta
              </td>
            </tr>
          ) : (
            procedures_render
          )}
        </tbody>
      </table>
    </>
  );
}
