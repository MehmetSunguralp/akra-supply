import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { RootState } from '@/store';
import { locales } from '@/locales';
import type { CompanyCardProps } from '@/types/CompanyCardProps';
import type { CompanyCardStrings } from '@/types/companyCardStrings';
import { CompanyCardCertifications } from './CompanyCardCertifications';
import { CompanyCardCover } from './CompanyCardCover';
import { CompanyCardDetailsGrid } from './CompanyCardDetailsGrid';

import { Box, Button, Card, Fade } from '@mui/material';

import VerifiedIcon from '@mui/icons-material/Verified';
import CompostIcon from '@mui/icons-material/Compost';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RecyclingIcon from '@mui/icons-material/Recycling';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { SvgIconComponent } from '@mui/icons-material';

const loadedCards = new Set<string>();

export default function CompanyCard({ cardData }: Readonly<CompanyCardProps>) {
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const [isLoaded, setIsLoaded] = useState<boolean>(loadedCards.has(cardData.id));
  const navigate = useNavigate();

  const cardStrings = locales[currentLocale].common as CompanyCardStrings;
  const certificateIcons: Record<string, SvgIconComponent> = {
    'ISO 9001': VerifiedIcon,
    'ISO 14001': CompostIcon,
    CE: FactCheckIcon,
    RoHS: RecyclingIcon,
    TSE: GppGoodIcon,
    FDA: HealthAndSafetyIcon,
  };

  const handleImageLoad = () => {
    loadedCards.add(cardData.id);
    setIsLoaded(true);
  };

  return (
    <Fade in={isLoaded} timeout={300}>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <CompanyCardCover
          coverImage={cardData.coverImage}
          logo={cardData.logo}
          companyName={cardData.name}
          cityLabel={cardData.city.toLocaleUpperCase(currentLocale)}
          onImageLoad={handleImageLoad}
        />

        <Box sx={{ p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CompanyCardCertifications certifications={cardData.certifications} iconMap={certificateIcons} />
          <CompanyCardDetailsGrid cardData={cardData} strings={cardStrings} />

          <Button
            fullWidth
            variant='outlined'
            size='medium'
            endIcon={<KeyboardArrowRightIcon />}
            sx={{
              py: 1,
              fontWeight: 500,
              fontSize: { xs: '0.74rem', sm: '0.875rem' },
              letterSpacing: { xs: 1, sm: 2 },
              mt: 'auto',
            }}
            onClick={() => navigate('/manufacturers/' + cardData.id)}
          >
            {cardStrings.viewCompany.toLocaleUpperCase(currentLocale)}
          </Button>
        </Box>
      </Card>
    </Fade>
  );
}
