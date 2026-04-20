import { Navigation } from '@/components/navigation/Navigation';
import { APP_SCROLL_ROOT_ID } from '@/constants/appShell';
import { Router } from '@/routes/index';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Box
        sx={{
          display: 'flex',
          height: '100dvh',
          overflow: 'hidden',
        }}
      >
        <Navigation />
        <Box
          id={APP_SCROLL_ROOT_ID}
          component='main'
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: { xs: '84px', md: 0 },
          }}
        >
          <Router />
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
