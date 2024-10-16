import React from 'react';
import { Card } from '../types/card';

interface Filters {
  colors: string[];
  types: string[];
  rarities: string[];
  costs: string[];
  inkwell: string[];
}

interface FilterSidebarProps {
  cards: Card[];
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
}

function FilterSidebar({ cards, onFilterChange, filters }: FilterSidebarProps) {
  const uniqueValues = React.useMemo(() => {
    return {
      colors: Array.from(new Set(cards.map(card => card.color))),
      types: Array.from(new Set(cards.map(card => card.type))),
      rarities: Array.from(new Set(cards.map(card => card.rarity))),
      costs: Array.from(new Set(cards.map(card => card.cost?.toString() || ''))),
      inkwell: Array.from(new Set(cards.map(card => card.inkwell?.toString() || ''))),
    };
  }, [cards]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(v => v !== value);
    } else {
      updatedFilters[filterType].push(value);
    }
    onFilterChange(updatedFilters);
  };

  const renderFilterSection = (title: string, filterType: keyof Filters, values: string[]) => (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      {values.map(value => (
        <div key={value} className="flex items-center mb-1">
          <input
            type="checkbox"
            id={`${filterType}-${value}`}
            checked={filters[filterType].includes(value)}
            onChange={() => handleFilterChange(filterType, value)}
            className="mr-2"
          />
          <label htmlFor={`${filterType}-${value}`}>{value}</label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      {renderFilterSection('Colors', 'colors', uniqueValues.colors)}
      {renderFilterSection('Types', 'types', uniqueValues.types)}
      {renderFilterSection('Rarities', 'rarities', uniqueValues.rarities)}
      {renderFilterSection('Costs', 'costs', uniqueValues.costs)}
      {renderFilterSection('Inkwell', 'inkwell', uniqueValues.inkwell)}
    </div>
  );
}

export default FilterSidebar;
