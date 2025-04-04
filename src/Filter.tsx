import React from 'react';

import {
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

function Filter({ categories, selectedCategory, onSelectCategory }: any) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h6">Фильтр по категории</Typography>
      <Select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Все</MenuItem>
        {categories.map((category: any) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
  export default Filter;