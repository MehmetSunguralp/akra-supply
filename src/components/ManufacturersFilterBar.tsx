import { TURKISH_PROVINCES_SORTED } from '@/constants/turkishProvinces';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { CompanyFilters } from '@/types/company';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import LocationCityOutlined from '@mui/icons-material/LocationCityOutlined';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Slider,
  Stack,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

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

  const scoreTrackWidth = 100;
  const filterControls = (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={2}
      useFlexGap
      sx={{
        flexWrap: 'wrap',
        alignItems: { xs: 'stretch', lg: 'center' },
      }}
    >
      <TextField
        label={t.filterSearchLabel}
        placeholder={t.filterSearchPlaceholder}
        value={draftSearch}
        onChange={(e) => setDraftSearch(e.target.value)}
        size='small'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRounded fontSize='small' color='action' />
              </InputAdornment>
            ),
          },
        }}
        sx={{ flex: { lg: '1 1 240px' }, minWidth: { lg: 200 } }}
      />
      <FormControl size='small' sx={{ flex: { lg: '1 1 200px' }, minWidth: { xs: '100%', lg: 180 } }}>
        <InputLabel id='manufacturers-city-label'>{t.city}</InputLabel>
        <Select
          labelId='manufacturers-city-label'
          label={t.city}
          value={draftCity}
          onChange={(e) => setDraftCity(e.target.value)}
          MenuProps={{ slotProps: { paper: { sx: { maxHeight: 320 } } } }}
          startAdornment={
            <InputAdornment position='start' sx={{ mr: 0.5 }}>
              <LocationCityOutlined fontSize='small' sx={{ color: 'action.active' }} />
            </InputAdornment>
          }
        >
          <MenuItem value=''>{t.filterAll}</MenuItem>
          {TURKISH_PROVINCES_SORTED.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' sx={{ flex: { lg: '1 1 220px' }, minWidth: { xs: '100%', lg: 200 } }}>
        <InputLabel id='manufacturers-category-label'>{t.category}</InputLabel>
        <Select
          labelId='manufacturers-category-label'
          label={t.category}
          value={draftCategory}
          onChange={(e) => setDraftCategory(e.target.value)}
          startAdornment={
            <InputAdornment position='start' sx={{ mr: 0.5 }}>
              <CategoryOutlined fontSize='small' sx={{ color: 'action.active' }} />
            </InputAdornment>
          }
        >
          <MenuItem value=''>{t.filterAll}</MenuItem>
          {categoryKeys.map((key) => (
            <MenuItem key={key} value={key}>
              {t.categories[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: { xs: '80%', lg: '100%' },
          maxWidth: { xs: '80vw', lg: scoreTrackWidth },
          alignSelf: { xs: 'center', lg: 'stretch' },
          gap: 0.75,
          flex: { lg: '0 0 auto' },
        }}
      >
        <Rating
          value={draftMinScore}
          readOnly
          precision={0.1}
          max={5}
          aria-label={t.score}
          sx={{
            py: 0,
            lineHeight: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: { xs: '1.3rem', lg: '1rem' },
            '& .MuiRating-decimal': {
              flex: '1 1 20%',
              display: 'flex',
              justifyContent: 'center',
            },
            '& .MuiRating-icon': {
              flex: '1 1 20%',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        />
        <Slider
          value={draftMinScore}
          onChange={(_, v) => setDraftMinScore(Array.isArray(v) ? v[0] : v)}
          min={0}
          max={5}
          step={0.1}
          valueLabelDisplay='off'
          sx={{
            width: '100%',
            mt: 0,
            py: 0,
            boxSizing: 'border-box',
          }}
        />
      </Box>
      <Stack direction='row' spacing={1.5} sx={{ alignSelf: { xs: 'stretch', lg: 'center' } }}>
        <Button
          variant='contained'
          onClick={handleApply}
          disabled={loading}
          startIcon={<CheckRounded />}
          sx={{ flex: { xs: 1, lg: 'none' } }}
        >
          {t.filterApply}
        </Button>
        <Button
          variant='outlined'
          onClick={handleReset}
          disabled={loading}
          startIcon={<RestartAltRounded />}
          sx={{ flex: { xs: 1, lg: 'none' } }}
        >
          {t.filterReset}
        </Button>
      </Stack>
    </Stack>
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
