import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setmovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, [1]);

  //   console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "top center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.origanal_name}
        </h1>
        <div className="banner_buttons">
          <div className="banner_button">Play</div>
          <div className="banner_button">My list</div>
        </div>
        <p className="banner__description">
          {truncate(movie?.overview, 300)}
        </p>
      </div>
      <div className="bannerBottom__fade"></div>
    </header>
  );
}

export default Banner;
