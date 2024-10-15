import React, { useState } from 'react';
import { Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Card } from '../types/card';

interface FilterSidebarProps {
  cards: Card[];
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  colors: string[];
  types: string[];
  rarities: string[];
  costs: number[];
  inkwell: number[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ cards, onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    colors: [],
    types: [],
    rarities: [],
    costs: [],
    inkwell: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const uniqueValues = React.useMemo(() => {
    return {
      colors: [...new Set(cards.map(card => card.color))],
      types: [...new Set(cards.map(card => card.type))],
      rarities: [...new Set(cards.map(card => card.rarity))],
      costs: [...new Set(cards.map(card => card.cost))],
      inkwell: [...new Set(cards.map(card => card.inkwell))],
    };
  }, [cards]);

  const handleFilterChange = (filterType: keyof FilterOptions, value: string | number) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[filterType].indexOf(value);
      if (index > -1) {
        updatedFilters[filterType].splice(index, 1);
      } else {
        updatedFilters[filterType].push(value);
      }
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const filterContent = (
    <div className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <FilterSection title="Colors" options={uniqueValues.colors} selected={filters.colors} onChange={value => handleFilterChange('colors', value)} />
      <FilterSection title="Types" options={uniqueValues.types} selected={filters.types} onChange={value => handleFilterChange('types', value)} />
      <FilterSection title="Rarities" options={uniqueValues.rarities} selected={filters.rarities} onChange={value => handleFilterChange('rarities', value)} />
      <FilterSection title="Costs" options={uniqueValues.costs} selected={filters.costs} onChange={value => handleFilterChange('costs', value)} />
      <FilterSection title="Inkwell" options={uniqueValues.inkwell} selected={filters.inkwell} onChange={value => handleFilterChange('inkwell', value)} />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <IconButton onClick={toggleDrawer(true)} aria-label="filter">
          <FilterListIcon />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {filterContent}
        </Drawer>
      </>
    );
  }

  return filterContent;
};

interface FilterSectionProps {
  title: string;
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (value: string | number) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selected, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      {options.map(option => (
        <label key={option} className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default FilterSidebar;
