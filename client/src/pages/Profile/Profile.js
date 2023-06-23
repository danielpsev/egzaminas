import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";
import ProfileCSS from "./Profile.module.css";
import Reservation from "./Reservation";
import { v4 as uuidv4 } from "uuid";
const Profile = () => {
  const auth = useAuth();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getReservations = async () => {
    try {
      const res = await axios.get(`/reservations/my/`);
      console.log(res);
      setReservations(res.data.data.reservations);
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

  let reservations_render = reservations.map((el) => {
    return <Reservation obj={el} key={uuidv4()} />;
  });

  return (
    <main>
      <div className="wrapper">
        <div className="main-inner">
          <h2 className={ProfileCSS.ProfileTitle}>
            <span className="acc-color">{auth.user.username}</span> rezervacijos

          <div className="profile-reservations-container">
            {!isLoading ? (
          reservations.length > 0 ? (
            reservations_render
          ) : (
            <p className="text-color-second">Nerasta.</p>
          )
        ) : null}
        </div>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Profile;
