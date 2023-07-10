import React, { useState } from "react";

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
  const apiKey = "e8d2b17f";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`).then(
      (response) => {
        if (response.ok === true)
          response
            .json()
            .then((data: SearchResult[]) => {
              setSearchResults(data);
              setLoading(false);
              console.log(searchResults);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        else console.log("yo");
      }
    );
  };

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
    </div>
  );
};

export default Home;
