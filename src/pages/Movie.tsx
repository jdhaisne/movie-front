import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";

interface Ratings {
  Source: string;
  Value: string;
}

interface MovieInfo {
  Actors: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Ratings[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Year: string;
  ImdbID: string;
}

const Movie = () => {
  const { id } = useParams();
  const apiKey = "e8d2b17f";
  const [movieResult, setMovieResult] = useState<MovieInfo | null>(null);

  const getInfosMovie = () => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieResult(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getInfosMovie();
  }, []);

  console.log(movieResult);
  return (
    <div>
      {movieResult ? (
        <div className="SingleMovie-container">
          <div className="SingleMovie">
            <div className="SingleMovie-main">
              <h2 className="SingleMovie-title">{movieResult.Title}</h2>
              <p className="singleMovie-director">
                Réalisé par {movieResult.Director}
              </p>
              <p className="SingleMovie-year">
                Sortie : {movieResult.Released}
              </p>
            </div>
            <img
              src={movieResult.Poster}
              alt={movieResult.Poster}
              className="SingleMovie-image"
            />
            <div className="SingleMovie-infos">
              <p className="SingleMovie-plot">{movieResult.Plot}</p>
              <p className="SingleMovie-genre">Genre: {movieResult.Genre}</p>
              <p className="SingleMovie-runtime">
                Durée: {movieResult.Runtime}
              </p>
            </div>
          </div>
          <div className="SingleMovie-ratings">
            {movieResult.Ratings.map((elem, index) => {
              return (
                <div key={index}>
                  <p>Note: {elem.Value}</p>
                  <p>Source: {elem.Source}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Movie;
