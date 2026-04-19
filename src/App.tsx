import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '@/components/navigation/Navigation';
import { ManufacturersPage } from '@/pages/ManufacturersPage';
import { ManufacturerDetailPage } from '@/pages/ManufacturerDetailPage';

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/manufacturers' />}></Route>
          <Route path='/manufacturers' element={<ManufacturersPage />} />
          <Route
            path='/manufacturers/:id'
            element={<ManufacturerDetailPage />}
          />
          <Route path='*' element={<Navigate to='/manufacturers' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
