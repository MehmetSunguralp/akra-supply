import { Navigate, Route, Routes } from 'react-router-dom';
import { ManufacturersPage } from '@/pages/ManufacturersPage';
import { ManufacturerDetailPage } from '@/pages/ManufacturerDetailPage';
import { SettingsPage } from '@/pages/SettingsPage';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/manufacturers' />} />
      <Route path='/manufacturers' element={<ManufacturersPage />} />
      <Route path='/manufacturers/:id' element={<ManufacturerDetailPage />} />
      <Route path='/settings' element={<SettingsPage />} />
      <Route path='*' element={<Navigate to='/manufacturers' />} />
    </Routes>
  );
};
