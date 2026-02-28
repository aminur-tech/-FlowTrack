
import { useContext } from "react";
import { SearchContext } from "./SearchContextDef.jsx";

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context; // { searchTerm, setSearchTerm }
};