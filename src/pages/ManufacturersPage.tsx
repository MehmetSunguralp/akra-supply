import { getAllCompanies } from '@/api/apiCalls';
import CompanyCard from '@/components/CompanyCard';
import CompanyCardSkeleton from '@/components/CompanyCardSkeleton';
import { ManufacturersFilterBar } from '@/components/ManufacturersFilterBar';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { Company, CompanyFilters } from '@/types/company';
import SearchOffOutlined from '@mui/icons-material/SearchOffOutlined';
import { Alert, Box } from '@mui/material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const ManufacturersGrid = memo(function ManufacturersGrid({
  companies,
  loading,
}: {
  companies: Company[];
  loading: boolean;
}) {
  return (
    <Box
      sx={{
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
      {!loading && companies.map((card) => <CompanyCard key={card.id} cardData={card} />)}
      {loading &&
        [...new Array(12)].map((_, index) => <CompanyCardSkeleton key={`sk-${index}`} />)}
    </Box>
  );
});

export const ManufacturersPage = () => {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const t = locales[currentLocale].common;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchUsedFilters, setLastFetchUsedFilters] = useState(false);

  const fetchGeneration = useRef(0);

  const loadCompanies = useCallback(async (filters?: CompanyFilters) => {
    const id = ++fetchGeneration.current;
    setLoading(true);
    try {
      const response = await getAllCompanies(filters);
      if (id !== fetchGeneration.current) return;
      if (response.success) {
        setCompanies(response.data ?? []);
        setLastFetchUsedFilters(Boolean(filters && Object.keys(filters).length > 0));
      }
    } finally {
      if (id === fetchGeneration.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadCompanies();
    });
  }, [loadCompanies]);

  const handleApply = useCallback(
    (filters: CompanyFilters | undefined) => {
      void loadCompanies(filters);
    },
    [loadCompanies],
  );

  const handleReset = useCallback(() => {
    void loadCompanies();
  }, [loadCompanies]);

  const showFilteredEmpty = lastFetchUsedFilters && !loading && companies.length === 0;

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 0,
        flex: 1,
      }}
    >
      <ManufacturersFilterBar loading={loading} onApply={handleApply} onReset={handleReset} />
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pt: 2,
          pb: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <ManufacturersGrid companies={companies} loading={loading} />
        {showFilteredEmpty && (
          <Alert
            role='status'
            severity='warning'
            variant='outlined'
            icon={<SearchOffOutlined fontSize='inherit' />}
            sx={{ mt: 'auto', alignSelf: 'stretch' }}
          >
            {t.filterNoResults}
          </Alert>
        )}
      </Box>
    </Box>
  );
};
