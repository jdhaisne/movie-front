import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MHome.css";

interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const navigate = useNavigate();

  const apiKey = "e8d2b17f";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const searchResponse = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`
      );
      const searchData = await searchResponse.json();
      setTotalResults(parseInt(searchData.totalResults));

      const numRequests = Math.ceil(parseInt(searchData.totalResults) / 10);
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

      const localResponse = await fetch(
        `http://localhost:3000/movie/${searchTerm}`
      );
      const localData = await localResponse.json();
      const results = await Promise.all(fetchPromises);
      const allResults = results
        .flat()
        .filter((item) => item !== null && item !== undefined);

      const mergedResults = [...allResults, ...[localData]];
      const filterMerge = mergedResults.filter(
        (item) => item !== null && item !== undefined
      );
      setSearchResults(filterMerge);
      console.log(mergedResults);

      if (filterMerge.length > 0)
        navigate("/movies", { state: { searchResults: filterMerge } }); // Pass searchResults to the /movies route
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
<<<<<<< HEAD
=======
      <div className="totalresults">{totalResults} films ont été trouvés !</div>
      <div className="movies-container">
        {searchResults.map((elem, index) => {
          return (
            <div className="movies" key={index}>
              {/* <div className="movies-info">
                <h2 className="movies-title">{elem.Title}</h2>
                <p className="movies-year">Sortie :{elem.Year}</p>
              </div> */}
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
>>>>>>> 14c5cf7a3e2b0b05c078f0433404156180f609cb
    </div>
  );
};

export default MHome;
