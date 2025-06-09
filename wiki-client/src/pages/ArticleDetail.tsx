import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, saveArticle, ArticleDetail } from '../services/api';
import { Typography, Button, Box, Card, CardContent, Snackbar, Alert } from '@mui/material';

export default function ArticleDetailPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { title } = useParams<{ title: string }>();
  const [detail, setDetail] = useState<ArticleDetail & { wiki_id: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (title) {
      getArticle(title)
        .then(data => setDetail({ ...data, wiki_id: Number(title) }))
        .catch(e => setError(e instanceof Error ? e.message : String(e)))
        .finally(() => setLoading(false));
    }
  }, [title]);

  if (loading) return <Typography>Loading…</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!detail) return null;

  const handleSave = () => {
    saveArticle(detail)
      // .then(() => alert('Artículo guardado'))
      .catch(e => alert(e instanceof Error ? e.message : String(e)));

    setOpenSnackbar(true);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenSnackbar(false)}>
          Artículo guardado correctamente
        </Alert>
      </Snackbar>
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 2, opacity: 0.95 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{detail.title}</Typography>
          <Typography paragraph>{detail.summary}</Typography>
          <Typography variant="body2"><strong>Word Count:</strong> {detail.word_count}</Typography>
          <Typography variant="body2"><strong>Top Words:</strong> {detail.top_words}</Typography>
          <Box mt={2} display="flex" gap={2}>
            <Button variant="outlined" href={detail.url} target="_blank">Original</Button>
            <Button variant="contained" onClick={handleSave}>Guardar Artículo</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}