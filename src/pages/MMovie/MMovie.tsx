import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { MMovieForm } from "../../components/MMovieForm/MMovieForm";
import { MTopic } from "../../components/MTopic/MTopic";
import "./MMovie.css";
import RatingSystem from "../../components/MRating/MRating";
import { MLikeButton } from "../../components/MLikeButton/MLikeButton";

import { MDeleteLikeButton } from "../../components/MDeleteLike/MDeleteLike";

interface Ratings {
  Source: string;
  Value: string;
}
export interface DataApi {
  title: string;
  subject: string;
  type: string;
  id: string;
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
  imdbID: string;
}

const MMovie = () => {
  const { id } = useParams();
  const apiKey = "e8d2b17f";
  const [movieResult, setMovieResult] = useState<MovieInfo | null>(null);
  const [imgAndName, setImgAndName] = useState<string[]>([]);

  const getInfosMovie = () => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieResult(data);
        const copyPoster = [];
        const name: string = localStorage.getItem("firstName");
        const userId: string = localStorage.getItem("id");
        copyPoster.push(name);
        copyPoster.push(data.Poster);
        copyPoster.push(userId);
        console.log(data.Poster, "test22");
        setImgAndName(copyPoster);
        console.log(imgAndName[2]);
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
      console.log(data, "aa");
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

  console.log(imgAndName);
  const api = `http://localhost:3000/topic/${id}`;
  return (
    <div>
      {movieResult ? (
        <>
          <div className="main-content">
            <nav className="nav-movie">
              <div className="div-movieHeader">
                <div className="div-image-movie">
                  <img
                    src={movieResult.Poster}
                    alt={movieResult.Poster}
                    className="SingleMovie-image"
                  />
                  <div className="div-like">
                    <MLikeButton movieId={movieResult.imdbID} />
                    <MDeleteLikeButton movieId={movieResult.imdbID} />
                  </div>
                </div>
                <div className="div-post">
                  <MMovieForm fetchData={fetchData}></MMovieForm>
                </div>
                <div className="div-left">
                  <div className="infos-movie">
                    <h2 className="SingleMovie-title">{movieResult.Title}</h2>

                    <p className="singleMovie-director">
                      made by {movieResult.Director}
                    </p>
                    <div className="div-nav">
                      <nav>
                        <ul>
                          <li>
                            <NavLink
                              to={`/movie/${id}/notes`}
                              activeClassName="active"
                              state={{ from: movieResult.Actors }}
                            >
                              Casting
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={`/movie/${id}/critiques`}
                              activeClassName="active"
                              state={{ from: movieResult.Ratings }}
                            >
                              Critiques presse
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={`/movie/${id}/comments`}
                              activeClassName="active"
                              state={{ from: movieResult.Plot }}
                            >
                              Other infos
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={`/movie/${id}/plot`}
                              activeClassName="active"
                              state={{ from: movieResult.Plot }}
                            >
                              Synopsis
                            </NavLink>
                          </li>
                        </ul>
                      </nav>
                      <div className="div-nav-content" style={{ width: "80%" }}>
                        <Outlet />
                      </div>
                    </div>
                  </div>
                  <RatingSystem />
                </div>
              </div>
            </nav>
            <MMovieForm
              fetchData={fetchData}
              imgAndName={imgAndName}
            ></MMovieForm>
            <MTopic ourData={ourData}></MTopic>
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
