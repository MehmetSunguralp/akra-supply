import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Box, Rating, Stack, Typography } from '@mui/material';

import type { CompanyCardData } from '@/types/CompanyCardProps';
import type { CompanyCardStrings } from '@/types/companyCardStrings';

type CompanyCardDetailsGridProps = {
  cardData: CompanyCardData;
  strings: CompanyCardStrings;
};

export const CompanyCardDetailsGrid = ({ cardData, strings }: CompanyCardDetailsGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 1,
        mb: 1,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <CategoryIcon fontSize='small' />
          <Typography variant='body2' sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }}>
            {strings.category}
          </Typography>
        </Box>
        <Typography variant='subtitle1' sx={{ fontSize: { xs: '0.86rem', sm: '1rem' } }}>
          {strings.categories[cardData.category]}
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <ThumbUpIcon fontSize='small' />
          <Typography variant='body2' sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }}>
            {strings.score}
          </Typography>
        </Box>
        <Stack direction='row' sx={{ alignItems: 'center' }} spacing={0.5}>
          <Rating readOnly value={cardData.score} precision={0.1} size='small' />
          <Typography variant='subtitle1' sx={{ fontSize: { xs: '0.86rem', sm: '1rem' } }}>
            {cardData.score}
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <LocalOfferIcon fontSize='small' />
          <Typography variant='body2' sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }}>
            {strings.minimumOrder}
          </Typography>
        </Box>
        <Typography variant='subtitle1' sx={{ fontSize: { xs: '0.86rem', sm: '1rem' } }}>
          {cardData.minimumOrder} {strings.piece}
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <WatchLaterIcon fontSize='small' />
          <Typography variant='body2' sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }}>
            {strings.leadTime}
          </Typography>
        </Box>
        <Typography variant='subtitle1' sx={{ fontSize: { xs: '0.86rem', sm: '1rem' } }}>
          {cardData.leadTime} {strings.day}
        </Typography>
      </Box>
    </Box>
  );
};
