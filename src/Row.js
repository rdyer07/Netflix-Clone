import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./request";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition / variable
  useEffect(() => {
    //  if [], run once when the row loads and don't run it again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return requests;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const handleClick = movie => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then(url => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=4&t=1809s
          const urlParams = new URLSearchParams(new URL(url).search);
          //   urlParams passes the youtube url into the function and searches for it
          setTrailerUrl(urlParams.get("v"));
          //   urlParams gets the rest of the string after a specified character
        })
        .catch(error => console.log(error));
    }
  };
  //   handleClick --> if video was already open and picture was clicked, sets the trailerUrl to empty to close it and hide the video

  //if pulling a variable from outside the useEffect function, you have to declare it in the array parameter e.g [fetchUrl because the function is dependent on that variable]

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* several row posters */}
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            // key optimises your web app
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
