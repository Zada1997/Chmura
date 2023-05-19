import React from "react";

const Modal = ({ modalData, toggleModal }) => {
  return (
    <div className="actor_modal" onClick={() => toggleModal(null)}>
      <div>
        <img
          src={require(`./images/${modalData.data.id}.jpg`)}
          alt={modalData.data.name}
        />
        <p>
          Name: <strong>{modalData.data.name}</strong>
        </p>
        <p>
          Movies with Keanu Reeves:
          {modalData.data?.KRmovies?.map((ele, index) => {
            return (
              <strong key={ele.movieId}>
                {" "}
                {ele.title}
                {index < modalData.data.KRmovies.length - 1 ? ", " : "."}
              </strong>
            );
          })}
        </p>
        <p>
          Movies with Nicolas Cage:
          {modalData.data?.NCmovies?.map((ele, index) => {
            return (
              <strong key={ele.movieId}>
                {" "}
                {ele.title}
                {index < modalData.data.NCmovies.length - 1 ? ", " : "."}
              </strong>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default Modal;
