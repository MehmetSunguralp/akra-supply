import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import VerifiedIcon from '@mui/icons-material/Verified';
import CompostIcon from '@mui/icons-material/Compost';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RecyclingIcon from '@mui/icons-material/Recycling';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { SvgIconComponent } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { CompanyCardProps } from '@/types/CompanyCardProps';

export default function CompanyCard({ cardData }: CompanyCardProps) {
  const currentLocale = useSelector(
    (state: RootState) => state.locale.currentLocale,
  );

  const cardStrings = locales[currentLocale].common;

  const certificateIcons: Record<string, SvgIconComponent> = {
    'ISO 9001': VerifiedIcon,
    'ISO 14001': CompostIcon,
    CE: FactCheckIcon,
    RoHS: RecyclingIcon,
    TSE: GppGoodIcon,
    FDA: HealthAndSafetyIcon,
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: 140,
          backgroundImage: `url(${cardData.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1.5,
          }}
        >
          <Avatar
            src={cardData.logo}
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'white',
            }}
          />

          <Box sx={{ color: 'white', minWidth: 0 }}>
            <Typography
              variant='h5'
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {cardData.name}
            </Typography>

            <Typography variant='subtitle2'>
              {cardData.city.toLocaleUpperCase(currentLocale)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2.5 }}>
          {cardData.certifications.map((certificate) => {
            const Icon = certificateIcons[certificate] || VerifiedIcon;

            return (
              <Chip
                key={certificate}
                icon={<Icon sx={{ fontSize: 18 }} />}
                label={certificate}
                size='small'
                color='warning'
                variant='outlined'
                sx={{ pl: 0.5 }}
              />
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography variant='body2'>{cardStrings.category}</Typography>

            <Typography variant='subtitle1'>
              {
                cardStrings.categories[
                  cardData.category as keyof typeof cardStrings.categories
                ]
              }
            </Typography>
          </Box>

          <Box>
            <Typography variant='body2'>{cardStrings.score}</Typography>

            <Stack direction='row' sx={{ alignItems: 'center' }} spacing={0.5}>
              <Rating
                readOnly
                value={cardData.score}
                precision={0.1}
                size='small'
              />

              <Typography variant='subtitle1'>{cardData.score}</Typography>
            </Stack>
          </Box>

          <Box>
            <Typography variant='body2'>{cardStrings.minimumOrder}</Typography>

            <Typography variant='subtitle1'>
              {cardData.minimumOrder} {cardStrings.piece}
            </Typography>
          </Box>

          <Box>
            <Typography variant='body2'>{cardStrings.leadTime}</Typography>

            <Typography variant='subtitle1'>
              {cardData.leadTime} {cardStrings.day}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant='outlined'
          size='medium'
          endIcon={<KeyboardArrowRightIcon />}
          sx={{
            py: 1,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          {cardStrings.viewCompany.toLocaleUpperCase(currentLocale)}
        </Button>
      </Box>
    </Card>
  );
}
