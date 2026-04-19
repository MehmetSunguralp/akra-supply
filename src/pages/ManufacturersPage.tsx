import CompanyCard from '@/components/CompanyCard';
import { manufacturers } from '@/mockData';
import { Box } from '@mui/material';

export const ManufacturersPage = () => {
  return (
    <Box
      component='main'
      sx={{
        p: 3,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
      }}
    >
      {manufacturers.map((card) => (
        <CompanyCard key={card.id} cardData={card} />
      ))}
    </Box>
  );
};
