import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams, Link, Outlet } from "react-router-dom";

const Suivi = () => {
  //   const location = useLocation();
  //   const { from } = location.state;

  //   console.log(from);

  const { id } = useParams();
  const [tableOfLike, setTableOfLike] = useState([]);

  const handleClickSuivi = async () => {
    try {
      const response = await fetch("http://localhost:3000/like/user/" + id);
      const dataLikes = await response.json();

      if (dataLikes.length !== 0) {
        const apiKey = "e8d2b17f";
        const moviePromises = dataLikes.map(async (elem) => {
          const response1 = await fetch(
            `https://www.omdbapi.com/?i=${elem.movieId}&apikey=${apiKey}`
          );
          const data1 = await response1.json();

          const response2 = await fetch(
            "http://localhost:3000/movie/" + elem.movieId
          );
          const data2 = await response2.json();

          return { ...data1, ...data2 };
        });

        const movies = await Promise.all(moviePromises);
        setTableOfLike(movies);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  // };

  console.log(tableOfLike);
  useEffect(() => {
    handleClickSuivi();
  }, []);

  return (
    <div>
      {tableOfLike.length > 0 ? (
        tableOfLike.map((elem, index) => (
          <img key={index} src={elem.Poster} alt={`Image ${index + 1}`} />
        ))
      ) : (
        <p>Aucun film suivi pour le moment.</p>
      )}
    </div>
  );
};

export default Suivi;
