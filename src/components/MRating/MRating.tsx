import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const colorsMean = {
  red: "#ee1010",
  grey: "#a9a9a9",
};

const RatingSystem = () => {
  //tableau d'étoiles
  const stars = Array(5).fill(0);
  const starsMean = Array(5).fill(0);

  //useState pour compter les étoiles liquées ou survolées
  const [currentValue, setCurrentValue] = useState(0);
  const [meanValue, setMeanValue] = useState(0);

  // Effectuez une requête pour récupérer la valeur par défaut à partir de la base de données
  useEffect(() => {
    // Votre code de requête pour récupérer la valeur par défaut (currentValue) ici...
    fetch("http://localhost:3000/rating/movie/" + id + "/" + movieID)
      .then((response) => response.json())
      .then((data) => {
        setCurrentValue(data.rating);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la valeur par défaut :",
          error
        );
        // Gérez les erreurs de requête ici
      });
  }, []);

  // Effectuez une requête pour récupérer la moyenne à partir de la base de données
  useEffect(() => {
    // Votre code de requête pour récupérer la moyenne (meanValue) ici...
    fetch("http://localhost:3000/rating/movie/mean/" + movieID)
      .then((response) => response.json())
      .then((data) => {
        console.log("GET MOYENNE");
        setMeanValue(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la valeur par défaut :",
          error
        );
        // Gérez les erreurs de requête ici
      });
  }, [currentValue]);

  const [overValue, setOverValue] = useState(undefined);

  //fonction pour cliquer sur l'étoile et colorer le nombre d'étoile correspondant
  const handleClick = (value: number) => {
    console.log(value);
    submitRating(value);
  };

  //fonction pour survoler l'étoile et colorer le nombre d'étoile correspondant
  const handleMouseOver = (value: any) => {
    setOverValue(value);
  };

  //fonction pour détecter le départ de la souris et décolorer les étoiles survolées
  const handleMouseLeave = (value: any) => {
    setOverValue(undefined);
  };

  // Obtenez l'URL actuelle
  const url = window.location.href;

  // Créez une instance d'URL à partir de l'URL
  const urlObj = new URL(url);

  // Récupérez le dernier segment de l'URL
  const movieID = urlObj.pathname.split("/").pop();

  // Récupérer la valeur de l'id depuis le localStorage
  const id = localStorage.getItem("id");

  interface RatingModel {
    userId: string;
    movieID: string;
    rating: number;
  }

  // post the reservation and retrieve the reservation id in the reservationResponse
  async function submitRating(value: any) {
    const rating: RatingModel = {
      userId: id !== null && id !== undefined ? id : "", // Effectuer une vérification de type pour éviter les valeurs null ou undefined
      movieID: movieID !== null && movieID !== undefined ? movieID : "",
      rating: value,
    };

    // create request options for the reservation request
    const RatingToPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    };
    console.log(RatingToPost);
    const submitResponse = await fetch(
      "http://localhost:3000/rating/",
      RatingToPost
    );
    setCurrentValue(value);
    console.log("SUBMIT RATING");
  }

  return (
    <div className="div-ratings">
      <h3>Notez le film ! </h3>
      <div className="container">
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            style={{ marginRight: 10, cursor: "pointer" }}
            color={
              (overValue || currentValue) > index ? colors.orange : colors.grey
            }
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <h3>Notes Spectateurs : </h3>
      <div className="container">
        {starsMean.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            style={{ marginRight: 10, cursor: "pointer" }}
            color={meanValue > index ? colorsMean.red : colorsMean.grey}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingSystem;
