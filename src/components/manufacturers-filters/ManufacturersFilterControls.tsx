import { TURKISH_PROVINCES_SORTED } from '@/constants/turkishProvinces';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import LocationCityOutlined from '@mui/icons-material/LocationCityOutlined';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Slider,
  Stack,
  TextField,
} from '@mui/material';
import type { FilterLabels } from '@/types/filterLabels';

type ManufacturersFilterControlsProps = {
  labels: FilterLabels;
  loading: boolean;
  categoryKeys: string[];
  search: string;
  city: string;
  category: string;
  minScore: number;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinScoreChange: (value: number) => void;
  onApply: () => void;
  onReset: () => void;
};

export const ManufacturersFilterControls = ({
  labels,
  loading,
  categoryKeys,
  search,
  city,
  category,
  minScore,
  onSearchChange,
  onCityChange,
  onCategoryChange,
  onMinScoreChange,
  onApply,
  onReset,
}: ManufacturersFilterControlsProps) => {
  return (
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
        label={labels.filterSearchLabel}
        placeholder={labels.filterSearchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
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
        <InputLabel id='manufacturers-city-label'>{labels.city}</InputLabel>
        <Select
          labelId='manufacturers-city-label'
          label={labels.city}
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          MenuProps={{ slotProps: { paper: { sx: { maxHeight: 320 } } } }}
          startAdornment={
            <InputAdornment position='start' sx={{ mr: 0.5 }}>
              <LocationCityOutlined fontSize='small' sx={{ color: 'action.active' }} />
            </InputAdornment>
          }
        >
          <MenuItem value=''>{labels.filterAll}</MenuItem>
          {TURKISH_PROVINCES_SORTED.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' sx={{ flex: { lg: '1 1 220px' }, minWidth: { xs: '100%', lg: 200 } }}>
        <InputLabel id='manufacturers-category-label'>{labels.category}</InputLabel>
        <Select
          labelId='manufacturers-category-label'
          label={labels.category}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          startAdornment={
            <InputAdornment position='start' sx={{ mr: 0.5 }}>
              <CategoryOutlined fontSize='small' sx={{ color: 'action.active' }} />
            </InputAdornment>
          }
        >
          <MenuItem value=''>{labels.filterAll}</MenuItem>
          {categoryKeys.map((key) => (
            <MenuItem key={key} value={key}>
              {labels.categories[key]}
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
          maxWidth: { xs: '80vw', lg: 100 },
          alignSelf: { xs: 'center', lg: 'stretch' },
          gap: 0.75,
          flex: { lg: '0 0 auto' },
        }}
      >
        <Rating
          value={minScore}
          readOnly
          precision={0.1}
          max={5}
          aria-label={labels.score}
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
          value={minScore}
          onChange={(_, v) => onMinScoreChange(Array.isArray(v) ? v[0] : v)}
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
          onClick={onApply}
          disabled={loading}
          startIcon={<CheckRounded />}
          sx={{ flex: { xs: 1, lg: 'none' } }}
        >
          {labels.filterApply}
        </Button>
        <Button
          variant='outlined'
          onClick={onReset}
          disabled={loading}
          startIcon={<RestartAltRounded />}
          sx={{ flex: { xs: 1, lg: 'none' } }}
        >
          {labels.filterReset}
        </Button>
      </Stack>
    </Stack>
  );
};
