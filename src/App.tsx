import { Navigation } from '@/components/navigation/Navigation';
import { Router } from '@/routes/index';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          height: '100dvh',
          overflow: 'hidden',
        }}
      >
        <Navigation />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Router />
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
