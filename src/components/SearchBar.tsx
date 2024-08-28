import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        className="mb-8 shadow appearance-none border border-orange-600 rounded py-2 px-3 bg-customGray
      text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 w-1/4 "
        placeholder="Pesquisar Filme"
      />
 
  );
};

export default SearchBar;
