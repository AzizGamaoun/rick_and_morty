import React from "react";
import CharacterCard from "./CharacterCard";

// Composant fonctionnel qui affiche la liste des personnages
const CharacterList = ({ characters }) => {
  return (
    <div className="character-list">
      {/* Parcourt la liste des personnages et affiche une carte pour chacun */}
      {characters.map((character) => (
        // Chaque élément doit avoir une clé unique pour aider React à gérer le rendu
        <CharacterCard 
          key={character.name} 
          character={character} 
        />
      ))}
    </div>
  );
};


export default CharacterList;