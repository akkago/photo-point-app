import React from 'react';
import {
  Typography,
  TextField
} from '@mui/material';

function Search({ searchTerm, onSearchChange }: any) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h6">Поиск</Typography>
      <TextField
        variant="outlined"
        placeholder="Введите название продукта..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
    </div>
  );
}

  export default Search;