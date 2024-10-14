import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cards';
import CardGrid from './CardGrid';

function Collection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['cards', debouncedSearchTerm],
    queryFn: () => fetchCards(debouncedSearchTerm),
    staleTime: Infinity,
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDebouncedSearchTerm(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">An error occurred: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange}
          placeholder="Search cards..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
      </form>
      {data?.cards && <CardGrid cards={data.cards} />}
      {data?.cards.length === 0 && (
        <p className="text-center mt-4">No cards found. Try a different search term.</p>
      )}
    </div>
  );
}

export default Collection;