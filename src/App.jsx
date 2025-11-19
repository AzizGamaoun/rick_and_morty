import React, { useEffect, useReducer, useState } from "react";
import CharacterList from "./components/CharacterList";
import "./App.scss";
import SearchNavbar from "./components/SearchNavbar";
import { toast, ToastContainer } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  characters: [],
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, characters: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Action non reconnue");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { characters, loading, error } = state;
  
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        if (!search.trim()) {
          // No search: fetch paginated characters
          dispatch({ type: "FETCH_INIT" });
          const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
          if (!response.ok) throw new Error("La requête a échoué");
          const data = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: data.results });
          toast.success(`Success: données chargées page ${page}`);
        } else {
          // Search query: ignore pagination
          setPage(1);
          const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
          if (!response.ok) throw new Error("La requête a échoué");
          const data = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: data.results });
        }
      } catch (err) {
        toast.error("Données non disponibles");
        console.error("Fetch failed:", err.message);
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };

    fetchCharacters();
  }, [search, page]);

  return (
    
      <div className="App">
        <h1>Rick and Morty Characters</h1>

        <div className="navigation">
          <button
            className="nav-button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Précédent
          </button>

          <SearchNavbar onSearchSubmit={setSearch} />

          <button 
            className="nav-button" 
            onClick={() => setPage((p) => p + 1)}
            disabled={characters.length < 20}
          >
            Suivant
          </button>
        </div>

        {loading && <p className="loading">Chargement...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        {!loading && !error && <CharacterList characters={characters} />}
        <ToastContainer />
      </div>
    );
  };

export default App;