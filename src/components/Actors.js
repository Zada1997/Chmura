import React from "react";

const Actors = ({ actor, toggleModal }) => {
  return (
    <li className="actors_card" onClick={() => toggleModal(actor)}>
      <p>
        Name: <strong>{actor.name}</strong>
      </p>
      <p>
        Movies with Keanu Reeves:
        {actor?.KRmovies?.map((ele, index) => {
          return (
            <strong key={ele.movieId}>
              {" "}
              {ele.title}
              {index < actor.KRmovies.length - 1 ? ", " : "."}
            </strong>
          );
        })}
      </p>
      <p>
        Movies with Nicolas Cage:
        {actor?.NCmovies?.map((ele, index) => {
          return (
            <strong key={ele.movieId}>
              {" "}
              {ele.title}
              {index < actor.NCmovies.length - 1 ? ", " : "."}
            </strong>
          );
        })}
      </p>
      <p className="btn_see_details">
        <span>See Details</span>
      </p>
    </li>
  );
};
export default Actors;
