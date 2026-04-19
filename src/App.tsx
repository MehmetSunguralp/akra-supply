import { Navigation } from '@/components/navigation/Navigation';
import { APP_SCROLL_ROOT_ID } from '@/constants/appShell';
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
          id={APP_SCROLL_ROOT_ID}
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
