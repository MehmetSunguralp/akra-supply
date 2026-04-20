import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { CompanyFilters } from '@/types/company';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import { Box, Button, Drawer, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ManufacturersFilterControls } from './ManufacturersFilterControls';

const buildFilters = (input: {
  search: string;
  city: string;
  category: string;
  minScore: number;
}): CompanyFilters | undefined => {
  const filters: CompanyFilters = {};
  if (input.search.trim()) filters.search = input.search.trim();
  if (input.city) filters.city = input.city;
  if (input.category) filters.category = input.category;
  if (input.minScore > 0) filters.minScore = input.minScore;

  return Object.keys(filters).length ? filters : undefined;
};

type ManufacturersFilterBarProps = {
  loading: boolean;
  onApply: (filters: CompanyFilters | undefined) => void;
  onReset: () => void;
};

export const ManufacturersFilterBar = memo(function ManufacturersFilterBar({
  loading,
  onApply,
  onReset,
}: ManufacturersFilterBarProps) {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const t = locales[currentLocale].common;

  const categoryKeys = useMemo(() => {
    const { categories } = locales[currentLocale].common;
    return Object.keys(categories) as (keyof typeof categories)[];
  }, [currentLocale]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [draftSearch, setDraftSearch] = useState('');
  const [draftCity, setDraftCity] = useState('');
  const [draftCategory, setDraftCategory] = useState('');
  const [draftMinScore, setDraftMinScore] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleApply = () => {
    onApply(
      buildFilters({
        search: draftSearch,
        city: draftCity,
        category: draftCategory,
        minScore: draftMinScore,
      }),
    );
    if (isMobile) setMobileOpen(false);
  };

  const handleReset = () => {
    setDraftSearch('');
    setDraftCity('');
    setDraftCategory('');
    setDraftMinScore(0);
    onReset();
    if (isMobile) setMobileOpen(false);
  };

  const filterControls = (
    <ManufacturersFilterControls
      labels={t}
      loading={loading}
      categoryKeys={categoryKeys}
      search={draftSearch}
      city={draftCity}
      category={draftCategory}
      minScore={draftMinScore}
      onSearchChange={setDraftSearch}
      onCityChange={setDraftCity}
      onCategoryChange={setDraftCategory}
      onMinScoreChange={setDraftMinScore}
      onApply={handleApply}
      onReset={handleReset}
    />
  );

  return (
    <Paper
      elevation={0}
      square
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        width: '100%',
        borderRadius: 0,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        {isMobile ? (
          <>
            <Button
              variant='outlined'
              onClick={() => setMobileOpen(true)}
              startIcon={<FilterListRounded />}
              sx={{ width: '100%' }}
            >
              {t.filterToggle}
            </Button>
            <Drawer
              anchor='top'
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              slotProps={{
                paper: {
                  sx: {
                    p: 2,
                    pt: 3,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                },
              }}
            >
              {filterControls}
            </Drawer>
          </>
        ) : (
          filterControls
        )}
      </Box>
    </Paper>
  );
});
