import axios from "axios";
import { useEffect, useState } from "react";
import Actors from "./components/Actors";
import Modal from "./components/Modal";

const URL = "https://switch-yam-equator.azurewebsites.net/api/";
const idKR = 206;
const idNC = 115;

function App() {
  const [loading, setLoading] = useState(null);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [commonActors, setCommonActors] = useState([]);
  const [modalData, setModalData] = useState({ open: false, data: null });
  // fetching movies with axios
  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(URL + "movies", {
        headers: {
          "x-chmura-cors": "ddc7de49-7bd7-4656-81f3-7d08311718e3",
        },
      });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // fetching actors with axios
  const getActors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(URL + "actors", {
        headers: {
          "x-chmura-cors": "ddc7de49-7bd7-4656-81f3-7d08311718e3",
        },
      });
      setActors(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
    getActors();
  }, []);

  const displayActors = () => {
    const commonActorsId = findCommonActorsId(movies, idKR, idNC);
    const uniqueActors = findCommonActors(actors, commonActorsId);
    uniqueActors.map((actor) => {
      // storing new data with actors and movies
      const filteredMoviesWithKR = filterMovies(movies, actor.actorId, idKR);
      const filteredMoviesWithNC = filterMovies(movies, actor.actorId, idNC);
      setCommonActors((prev) => [
        ...prev,
        {
          id: actor.actorId,
          name: actor.name,
          KRmovies: filteredMoviesWithKR,
          NCmovies: filteredMoviesWithNC,
        },
      ]);
      return actor;
    });
  };
  const toggleModal = (actor) => {
    setModalData({ open: !modalData.open, data: actor });
  };
  return (
    <div className="App">
      <h1>Actors</h1>
      <p>
        List of actors who have been in a movie with Nicolas Cage and Keanu
        Reeves.
      </p>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <button
            onClick={displayActors}
            className={commonActors.length > 0 ? "btn_show_actors" : ""}
          >
            Show Actors
          </button>
          <ul>
            {commonActors.map((actor) => {
              return (
                <Actors
                  key={actor.id}
                  actor={actor}
                  toggleModal={toggleModal}
                />
              );
            })}
          </ul>
        </>
      )}
      {modalData.open && (
        <Modal modalData={modalData} toggleModal={toggleModal} />
      )}
    </div>
  );
}

export default App;

// filtering movies by actors who have been in a movie with both Keanu Reeves and Nicolas Cage
const filterMovies = (movies, actorId, starId) => {
  return movies.filter((movie) => {
    return movie.actors.includes(actorId) && movie.actors.includes(starId);
  });
};

// finding actors IDs who have been in a movie with both Keanu Reeves and Nicolas Cage
const findCommonActorsId = (movies, actorId1, actorId2) => {
  const both = {};
  const actorIdsWithFirstActor = {};
  const actorIdsWithSecondActor = {};
  for (let movie of movies) {
    if (movie.actors.includes(actorId1) && movie?.actors?.includes(actorId2)) {
      movie.actors.forEach((id) => {
        both[id] = id;
      });
    } else if (movie.actors.includes(actorId1)) {
      movie.actors.forEach((id) => {
        actorIdsWithFirstActor[id] = id;
      });
    } else if (movie.actors.includes(actorId2)) {
      movie.actors.forEach((id) => {
        actorIdsWithSecondActor[id] = id;
      });
    }
  }

  for (let id in actorIdsWithFirstActor) {
    if (actorIdsWithSecondActor[id]) {
      both[id] = id;
    }
  }
  return both;
};

// filtering all actors to access their name
const findCommonActors = (actors, actorIds) => {
  const commonActorsArray = [];
  for (let actor of actors) {
    if (actorIds.hasOwnProperty(actor.actorId)) {
      commonActorsArray.push(actor);
    }
  }
  return commonActorsArray;
};
