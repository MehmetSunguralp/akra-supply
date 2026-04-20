import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, Typography } from '@mui/material';

type CompanyCardCoverProps = {
  coverImage: string;
  logo: string;
  companyName: string;
  cityLabel: string;
  onImageLoad: () => void;
};

export const CompanyCardCover = ({ coverImage, logo, companyName, cityLabel, onImageLoad }: CompanyCardCoverProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 120, sm: 140 },
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box component='img' src={coverImage} alt={companyName} onLoad={onImageLoad} sx={{ display: 'none' }} />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.45) 35%, rgba(255,255,255,0.82) 100%)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 100%)',
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
          src={logo}
          sx={{
            width: { xs: 46, sm: 56 },
            height: { xs: 46, sm: 56 },
            bgcolor: 'white',
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant='h5'
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.5rem' },
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {companyName}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <PlaceIcon fontSize='small' color='primary' />
            <Typography variant='subtitle2' sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              {cityLabel}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
