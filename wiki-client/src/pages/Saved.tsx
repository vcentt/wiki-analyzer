import { useEffect, useState } from 'react';
import { getSaved, deleteSaved, SavedArticle } from '../services/api';
import { Typography, Box, Button, Card, CardContent } from '@mui/material';

export default function SavedPage() {
  const [list, setList] = useState<SavedArticle[]>([]);

  const load = async () => setList(await getSaved());
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => { await deleteSaved(id); load(); };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Mis Artículos Guardados</Typography>
      {list.map(item => (
        <Card key={item.id} sx={{ mb: 2, backgroundColor: '#fff', opacity: 0.9 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{item.title}</Typography>
            <Box>
              <Button size="small" href={item.url} target="_blank">Ver</Button>
              <Button size="small" color="error" onClick={() => handleDelete(item.id)}>Eliminar</Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}