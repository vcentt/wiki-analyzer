import { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onSearch: (q: string) => void;
  notFound?: boolean; // Nuevo prop para indicar que no se encontraron resultados
}

export default function SearchBar({ onSearch, notFound = false }: Props) {
  const [q, setQ] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = q.trim();

    if (!trimmedQuery) {
      setError(true); // Activa error si el campo está vacío
      return;
    }

    setError(false);
    onSearch(trimmedQuery);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
      <TextField
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setError(false);
        }}
        placeholder="Search Wikipedia..."
        variant="outlined"
        fullWidth
        size="medium"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          '&:hover': { boxShadow: 3 }
        }}
        error={error || notFound}
        helperText={
          error
            ? "Please enter a search term"
            : notFound
              ? "No results found for this query"
              : ""
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            height: 50,
            fontSize: '1.1rem',
            paddingLeft: 1
          }
        }}
      />
    </Box>
  );
}