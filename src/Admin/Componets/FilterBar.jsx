import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterBar = ({ categories, subcategories, onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filters = { category, subcategory, searchQuery };
    onFilterChange(filters);
  };

  return (
    <div className="filter-bar">
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={e => setCategory(e.target.value)}>
          {/* Populate categories */}
        </Select>
      </FormControl>
      {/* Similar Select components for subcategory */}
      <TextField
       className="search-input"
        label="Search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button variant="contained" onClick={handleSearch} color="primary">Search</button>
    </div>
  );
};

export default FilterBar;
