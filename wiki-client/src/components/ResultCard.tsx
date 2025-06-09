// src/components/ResultCard.tsx
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { WikiResult } from '../services/api';

interface Props { item: WikiResult; }
export default function ResultCard({ item }: Props) {
  const thumb = item.thumbnail ? `https:${item.thumbnail.url}` : undefined;
  
  return (
    <Card 
      component={Link} 
      to={`/article/${encodeURIComponent(item.key)}`} 
      sx={{ 
        display: 'flex', 
        maxWidth: 600, 
        mx: 'auto',
        mb: 3, // Espacio entre cards
        height: 140, // Altura fija para todas las cards
        '&:hover': { 
          boxShadow: 3,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      {thumb && (
        <CardMedia 
          component="img" 
          image={thumb} 
          alt={item.title} 
          sx={{ 
            width: 140, 
            height: 140,
            objectFit: 'cover' // Asegura que la imagen se recorte correctamente
          }} 
        />
      )}
      
      {!thumb && (
        <Box sx={{
          width: 140,
          height: 140,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            No image
          </Typography>
        </Box>
      )}
      
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden' // Para contener el texto largo
      }}>
        <CardContent>
          <Typography 
            variant="h6" 
            noWrap // Evita que el título ocupe más de una línea
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            {item.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limita a 2 líneas
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4
            }}
          >
            {item.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}