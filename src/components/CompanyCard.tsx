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

import { useSelector } from 'react-redux';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import type { CompanyCardProps } from '@/types/CompanyCardProps';

export default function CompanyCard({ cardData }: CompanyCardProps) {
  const currentLocale = useSelector(
    (state: RootState) => state.locale.currentLocale,
  );

  const cardStrings = locales[currentLocale].common;

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
              sx={{
                fontWeight: 700,
                fontSize: 24,
                lineHeight: 1.1,
              }}
            >
              {cardData.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                opacity: 0.9,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {cardData.city.toLocaleUpperCase(currentLocale)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2.5 }}>
          {cardData.certifications.map((certificate) => (
            <Chip
              key={certificate}
              label={certificate}
              size='small'
              color='success'
              variant='outlined'
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2.5,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: 'text.secondary',
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              {cardStrings.category.toLocaleUpperCase(currentLocale)}
            </Typography>

            <Typography sx={{ fontWeight: 700 }}>
              {
                cardStrings.categories[
                  cardData.category as keyof typeof cardStrings.categories
                ]
              }
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: 'text.secondary',
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              {cardStrings.score.toUpperCase()}
            </Typography>

            <Stack direction='row' spacing={0.5}>
              <Rating
                readOnly
                value={cardData.score}
                precision={0.1}
                size='small'
              />

              <Typography sx={{ fontWeight: 700 }}>{cardData.score}</Typography>
            </Stack>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: 'texcardStrings.secondary',
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              {cardStrings.minimumOrder.toLocaleUpperCase(currentLocale)}
            </Typography>

            <Typography sx={{ fontWeight: 700 }}>
              {cardData.minimumOrder} {cardStrings.piece}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: 'text.secondary',
                letterSpacing: 1,
                mb: 0.5,
              }}
            >
              {cardStrings.leadTime.toLocaleUpperCase(currentLocale)}
            </Typography>

            <Typography sx={{ fontWeight: 700 }}>
              {cardData.leadTime} {cardStrings.day}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant='outlined'
          size='small'
          sx={{
            py: 1,
            fontWeight: 300,
            letterSpacing: 2,
          }}
        >
          {cardStrings.viewCompany.toLocaleUpperCase(currentLocale)}
        </Button>
      </Box>
    </Card>
  );
}
