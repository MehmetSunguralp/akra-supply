import { getAllCompanies } from '@/api/apiCalls';
import CompanyCard from '@/components/CompanyCard';
import CompanyCardSkeleton from '@/components/CompanyCardSkeleton';
import type { Company } from '@/types/company';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export const ManufacturersPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllCompanies()
      .then((response) => {
        if (response.success) {
          setCompanies(response.data || []);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      {companies &&
        companies.map((card) => <CompanyCard key={card.id} cardData={card} />)}
      {loading &&
        Array(20)
          .fill('')
          .map((_, index) => {
            return <CompanyCardSkeleton key={index} />;
          })}
    </Box>
  );
};
