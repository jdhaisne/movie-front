import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  id: string;
}

const Movies: React.FC = () => {
  const location = useLocation();
  const searchResults: SearchResult[] = location.state?.searchResults || [];

  return (
    <div>
      <h2 className="totalresults">
        {searchResults.length} film(s) trouvé(s) !
      </h2>
      <div className="movies-container">
        {searchResults.map((elem, index) => {
          return (
            <div className="movies" key={index}>
              {/* <div className="movies-info">
                <h2 className="movies-title">{elem.Title}</h2>
                <p className="movies-year">Sortie :{elem.Year}</p>
              </div> */}
              <Link to={`/movie/${elem.imdbID || elem.id}`}>
                <img
                  src={elem.Poster}
                  alt={elem.Poster}
                  className={`image-${index}` + " movie-img"}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
