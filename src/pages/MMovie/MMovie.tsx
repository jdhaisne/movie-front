import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { MMovieForm } from "../../components/MMovieForm/MMovieForm";
import { MTopic } from "../../components/MTopic/MTopic";
import "./MMovie.css";
import RatingSystem from "../../components/MRating/MRating";
import { MLikeButton } from "../../components/MLikeButton/MLikeButton";

import { MDeleteLikeButton } from "../../components/MDeleteLike/MDeleteLike";


interface Ratings {
  source: string;
  value: string;
}
export interface DataApi {
  title: string;
  subject: string;
  type: string;
  id: string;
}

interface MovieInfo {
  actors: string;
  boxOffice: string;
  country: string;
  Director: string;
  genre: string;
  language: string;
  plot: string;
  Poster: string;
  rated: string;
  ratings: Ratings[];
  released: string;
  runtime: string;
  Title: string;
  type: string;
  year: string;
  imdbID: string;
}

const MMovie = () => {
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
        console.error("omdbapi", error);
      });
  };
  const [ourData, setOurData] = useState<DataApi[]>([]);

  const fetchData = async () => {
    try {
      console.log("acant ");
      const response = await fetch(api);
      const data = await response.json();
      console.log("apre");
      setOurData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(movieResult);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getInfosMovie();
  }, []);
  const api = `http://localhost:3000/topic/${id}`;
  return (
    <div>
      {movieResult ? (
        <>
          <div className="main-content">
            <nav className="nav-movie">
              <div className="div-image-movie">
                <img
                  src={movieResult.Poster}
                  alt={movieResult.Poster}
                  className="SingleMovie-image"
                />
                <MLikeButton movieId={movieResult.imdbID} />
                <MDeleteLikeButton movieId={movieResult.imdbID} />
              </div>
              <div className="infos-movie">
                <h2 className="SingleMovie-title">{movieResult.Title}</h2>

                <p className="singleMovie-director">
                  Réalisé par {movieResult.Director}
                </p>
              </div>
              <RatingSystem />
            </nav>
            {/* <div className="div-nav">
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        to={`/movie/${id}/notes`}
                        activeClassName="active"
                      >
                        Notes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movie/${id}/critiques`}
                        activeClassName="active"
                      >
                        Critiques
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movie/${id}/comments`}
                        activeClassName="active"
                      >
                        Commentaires
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <div className="div-nav-content">
                  <Outlet />
                </div>
              </div> */}

            {/* <div className="SingleMovie-container">
              <div className="SingleMovie">
                <div className="SingleMovie-main">
            
                  <p className="SingleMovie-year">
                    Sortie : {movieResult.Released}
                  </p>
                </div>

                <div className="SingleMovie-infos">
                  <p className="SingleMovie-plot">{movieResult.Plot}</p>
                  <p className="SingleMovie-genre">
                    Genre: {movieResult.Genre}
                  </p>
                  <p className="SingleMovie-runtime">
                    Durée: {movieResult.Runtime}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <MLikeButton movieId={id}></MLikeButton>
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
            </div> */}
            <div className="div-post">
              <MMovieForm fetchData={fetchData}></MMovieForm>
              <MTopic ourData={ourData}></MTopic>
            </div>
          </div>
        </>
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

export default MMovie;
