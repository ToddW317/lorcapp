import React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
