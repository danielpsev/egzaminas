import React from "react";
import Procedure from "./Procedure";
import MainCSS from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
export default function ProceduresList(props) {
  const {procedures, isLoading } = props;
  let procedures_render = procedures.map((el) => {
    return <Procedure obj={el} key={uuidv4()} />;
  });
  return (
    <>
      {isLoading ? (
        <BeatLoader
          color="#3474eb"
          margin={15}
          size={40}
          cssOverride={{
            textAlign: "center",
          }}
        />
      ) : null}

      <div className={MainCSS.FilmListContainer}>
        {!isLoading ? (
          procedures.length > 0 ? (
            procedures_render
          ) : (
            <p className="text-color-second">Nerasta.</p>
          )
        ) : null}
      </div>
    </>
  );
}
