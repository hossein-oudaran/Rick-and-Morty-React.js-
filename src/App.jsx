import { useEffect, useState } from "react";
import "./App.css";

import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchOfResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Somthing went wrong😮");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(setIsLoading(false));
  // }, []);

  //* 2nd solution : use axios

  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavorites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFavorties = (id) => {
    setFavorites((prevFave) => prevFave.filter((fav) => fav.id !== id));
  };

  const isAddedToFavorite = favorites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />

      <Navbar numOfResult={characters.length}>
        <Search query={query} setQuery={setQuery} />
        <SearchOfResult numOfResult={characters.length} />
        <Favorites
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorties}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddedToFavorite={isAddedToFavorite}
        />
      </div>
    </div>
  );
}

export default App;
