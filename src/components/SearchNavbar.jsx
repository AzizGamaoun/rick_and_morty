import React, { useState } from "react";
import "../App.scss";

const SearchNavbar = ({ onSearchSubmit }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="search">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value); // update local state
          onSearchSubmit(e.target.value); // update parent
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchNavbar;