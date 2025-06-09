// src/pages/Home.tsx
import { useState } from 'react';
import { searchWikipedia, WikiResult } from '../services/api';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import { Typography, Box, CircularProgress } from '@mui/material';

export default function Home() {
  const [results, setResults] = useState<WikiResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (q: string) => {
    setLoading(true); setError(null); setResults([]);
    try {
      const data = await searchWikipedia(q);
      setResults(data);
      setNotFound(data.length === 0);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 800
    }}>
      {/* Barra de búsqueda centrada */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 4
      }}>
        <SearchBar onSearch={handleSearch} notFound={notFound} />
      </Box>

      {/* Contenedor de resultados con altura mínima */}
      <Box sx={{
        width: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Typography
            variant="h6"
            color="error"
            align="center"
            sx={{ maxWidth: 500, py: 2 }}
          >
            {error}
          </Typography>
        )}

        {notFound && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body1">
              Try different keywords or more specific terms
            </Typography>
          </Box>
        )}

        {/* Lista de resultados con scroll controlado */}
        <Box sx={{
          width: '100%',
          maxHeight: '65vh',
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4285f4',
            borderRadius: '4px'
          }
        }}>
          {results.map(item => (
            <Box key={item.id} sx={{ mb: 3 }}>
              <ResultCard item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}