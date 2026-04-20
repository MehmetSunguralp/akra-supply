import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, IconButton, Typography } from '@mui/material';

import type { LocaleName } from '@/types/locale';

type ManufacturerHeroProps = {
  companyName: string;
  city: string;
  logo: string;
  coverImage: string;
  locale: LocaleName;
  backLabel: string;
  desktopNavWidth: number;
  onBack: () => void;
};

export const ManufacturerHero = ({
  companyName,
  city,
  logo,
  coverImage,
  locale,
  backLabel,
  desktopNavWidth,
  onBack,
}: ManufacturerHeroProps) => {
  return (
    <>
      <IconButton
        onClick={onBack}
        aria-label={backLabel}
        sx={{
          position: 'fixed',
          top: { xs: 12, sm: 16, md: 32 },
          left: { xs: 12, sm: 16, md: `calc(${desktopNavWidth}px + 32px)` },
          zIndex: 1200,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 2,
          width: { xs: 36, sm: 40, md: 44 },
          height: { xs: 36, sm: 40, md: 44 },
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <ArrowBackIcon fontSize='small' />
      </IconButton>

      <Box
        sx={{
          height: { xs: 170, sm: 220, md: 320 },
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 3,
          boxShadow: (theme) => theme.shadows[4],
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.88) 100%)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: { xs: 12, sm: 16, md: 24 },
            right: { xs: 12, sm: 16, md: 24 },
            bottom: { xs: 12, sm: 16, md: 24 },
            display: 'flex',
            gap: { xs: 1, sm: 1.5, md: 2 },
            alignItems: 'flex-end',
          }}
        >
          <Avatar
            src={logo}
            sx={{
              width: { xs: 52, sm: 68, md: 88 },
              height: { xs: 52, sm: 68, md: 88 },
              bgcolor: 'white',
              border: '3px solid white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            }}
          />

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant='h3'
              sx={{
                color: 'common.white',
                textShadow: '0 2px 16px rgba(0,0,0,0.45)',
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.5rem', md: '2.25rem' },
                lineHeight: 1.15,
              }}
            >
              {companyName}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 0.5 }}>
              <PlaceIcon fontSize='large' sx={{ color: 'primary.light' }} />
              <Typography
                variant='h4'
                sx={{
                  color: 'common.white',
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  fontWeight: 500,
                  fontSize: { xs: '0.78rem', sm: '1rem', md: '1.4rem' },
                  lineHeight: 1.15,
                }}
              >
                {city.toLocaleUpperCase(locale)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
