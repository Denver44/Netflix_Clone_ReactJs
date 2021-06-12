import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovie] = useState([]);
  const [TrailerURL, setTrailerURL] = useState("");

  const handleClick = (movie) => {
    if (TrailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      // console.log(request.data.results[0].poster_path);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // This is from the Documention.  https://www.npmjs.com/package/react-youtube
  const opts = {
    height: "390",
    width: "98%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // console.table(movies);
  //   If we are using anythinh which variabile is outside we have to put in [fetchURl] like this. If we dont pass then if we pass different URl it will not fetch and gives another result. )
  return (
    <div className="row">
      <h2 className="title">{title} </h2>
      {/* Container => Posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {TrailerURL && <YouTube videoId={TrailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
