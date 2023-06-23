import React from "react";
import AdmReservation from "./AdmReservation";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
export default function AdmReservationsTable(props) {
  const { reservations, isLoading, getReservations } = props;

  const cancelReservation = async (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite atšaukti rezervaciją?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D83C3E",
        cancelButtonColor: "#1e273d",
        confirmButtonText: "Taip",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.patch("/reservations/cancel/" + id);
            swal.fire({
              title: "Sėkmingai",
              text: "Rezervacija atšaukta",
              icon: "success",
              confirmButtonColor: "#3BA55B",
            });
            getReservations();
          } catch (err) {
            console.log(err);
            toast.error(err.response.data.mess);
          }
        }
      });
  };

  const acceptReservation = async (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite patvirtinti rezervaciją?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D83C3E",
        cancelButtonColor: "#1e273d",
        confirmButtonText: "Taip",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.patch("/reservations/accept/" + id);
            swal.fire({
              title: "Sėkmingai",
              text: "Rezervacija patvirtinta",
              icon: "success",
              confirmButtonColor: "#3BA55B",
            });
            getReservations();
          } catch (err) {
            console.log(err);
            toast.error(err.response.data.mess);
          }
        }
      });
  };

  let reservations_render = reservations.map((el) => {
    return (
      <AdmReservation
        obj={el}
        key={uuidv4()}
        cancelReservation={cancelReservation}
        acceptReservation={acceptReservation}
      />
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Vartotojas</th>
            <th>Procedūra</th>
            <th>Statusas</th>
            <th>Data</th>
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
          ) : reservations_render.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Nerasta
              </td>
            </tr>
          ) : (
            reservations_render
          )}
        </tbody>
      </table>
    </>
  );
}
