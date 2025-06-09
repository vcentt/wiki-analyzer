// src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Saved from './pages/Saved';
import Logo from './assets/wikipedia-logo.svg';

export default function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)'
    }}>
      {/* Encabezado con gradiente suave */}
      <Box sx={{
        textAlign: 'center',
        py: 3,
        background: 'linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)',
        color: 'white'
      }}>
        <Box
          component="img"
          src={Logo}
          alt="Wikipedia"
          sx={{ width: 60, filter: 'brightness(0) invert(1)' }}
        />
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 700,
          mt: 1
        }}>
          Wiki Analyzer
        </Typography>
      </Box>

      {/* Barra de navegación minimalista */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{
          justifyContent: 'center',
          py: 1,
          backgroundColor: 'white'
        }}>
          <Button component={Link} to="/" sx={{ mx: 2, fontWeight: 600 }}>Home</Button>
          <Button component={Link} to="/saved" sx={{ mx: 2, fontWeight: 600 }}>My Saved</Button>
        </Toolbar>
      </AppBar>

      {/* Contenido principal - Aquí aplicamos el centrado superior */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alineación desde arriba
        flex: 1,
        py: 4,
        px: 2
      }}>
        <Container maxWidth="md" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:title" element={<ArticleDetail />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </Container>
      </Box>

      {/* Footer minimalista */}
      <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: 'white' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Wiki Analyzer
        </Typography>
      </Box>
    </Box>
  );
}