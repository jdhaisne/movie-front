import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);

  const apiKey = "e8d2b17f";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);

    fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalResults(parseInt(data.totalResults));
        const numRequests = Math.ceil(parseInt(data.totalResults) / 10);
        const fetchPromises = [];

        for (let page = 1; page <= numRequests; page++) {
          fetchPromises.push(
            fetch(
              `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&type=movie&apikey=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => data.Search)
          );
        }

        fetchPromises.push(
          fetch(`http://localhost:3000/movie/${searchTerm}`)
            .then((response) => response.json())
            .then((data) => console.log(data))
        );

        Promise.all(fetchPromises)
          .then((results) => {
            const allResults = results.flat();
            setSearchResults(allResults);
            return allResults;
          })
          .then((data) => {
            setSearchResults(data.filter((data) => data !== undefined));
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Rechercher..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Chargement..." : "Rechercher"}
      </button>
      <div className="totalresults">{totalResults} films ont été trouvés !</div>
      <div className="movies-container">
        {searchResults.map((elem, index) => {
          return (
            <div className="movies" key={index}>
              <div className="movies-info">
                <h2 className="movies-title">{elem.Title}</h2>
                <p className="movies-year">Sortie :{elem.Year}</p>
              </div>
              <Link to={`/movie/${elem.imdbID}`}>
                <img
                  src={elem.Poster}
                  alt={elem.Poster}
                  className={`image-${index}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
