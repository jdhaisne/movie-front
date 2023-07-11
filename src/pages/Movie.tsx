import React from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { imdbID } = useParams();
  const apiKey = "e8d2b17f";

  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
  return <div></div>;
};

export default Movie;
