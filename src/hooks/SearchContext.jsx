import { useState } from "react";
import { SearchContext } from "./SearchContextDef.jsx";

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

