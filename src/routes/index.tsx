import { Navigate, Route, Routes } from 'react-router-dom';
import { ManufacturersPage } from '@/pages/ManufacturersPage';
import { ManufacturerDetailPage } from '@/pages/ManufacturerDetailPage';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/manufacturers' />} />
      <Route path='/manufacturers' element={<ManufacturersPage />} />
      <Route path='/manufacturers/:id' element={<ManufacturerDetailPage />} />
      <Route path='*' element={<Navigate to='/manufacturers' />} />
    </Routes>
  );
};
