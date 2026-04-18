import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ManufacturersPage } from '@/pages/ManufacturersPage';
import { Navigation } from '@/components/navigation/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/manufacturers' />}></Route>
          <Route path='/manufacturers' element={<ManufacturersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
