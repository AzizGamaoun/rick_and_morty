
const CharacterCard = ({ character }) => {
  // Utilise l'image de l'API Rick and Morty ou un avatar généré en fallback
  const characterImage = character.image || `https://ui-avatars.com/api/?name=${character.name}`;

  return (
    <div className="character-card">
      {/* Image du personnage */}
      <img src={characterImage} alt={character.name} />

      {/* Nom du personnage */}
      <h2>{character.name}</h2>

      <p>Statut : {character.status}</p>
      <p>Espèce : {character.species}</p>
      <p>Genre : {character.gender}</p>
      <p>Origine : {character.origin?.name || "Inconnue"}</p>
    </div>
  );
};

// Exportation du composant pour utilisation dans d'autres fichiers
export default CharacterCard;