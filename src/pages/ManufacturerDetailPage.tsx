import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RequestForm from '@/components/RequestForm';
import type { RootState } from '@/store';
import { locales } from '@/locales';
import { getCompanyById } from '@/api/apiCalls';
import type { Company } from '@/types/company';

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import VerifiedIcon from '@mui/icons-material/Verified';
import CompostIcon from '@mui/icons-material/Compost';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RecyclingIcon from '@mui/icons-material/Recycling';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import type { SvgIconComponent } from '@mui/icons-material';

export const ManufacturerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);

  const t = locales[currentLocale].common;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  const formRef = useRef<HTMLDivElement | null>(null);

  const certificateIcons: Record<string, SvgIconComponent> = {
    'ISO 9001': VerifiedIcon,
    'ISO 14001': CompostIcon,
    CE: FactCheckIcon,
    RoHS: RecyclingIcon,
    TSE: GppGoodIcon,
    FDA: HealthAndSafetyIcon,
  };

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;

      const response = await getCompanyById(id);

      if (response.success && response.data) {
        setCompany(response.data);
      }

      setLoading(false);
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!company) return null;

  return (
    <>
      <Fade in timeout={400}>
        <Box sx={{ p: 3 }}>
          {/* sticky actions */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              gap: 1,
              mb: 2,
              py: 1,
              bgcolor: 'background.default',
            }}
          >
            <Button startIcon={<ArrowBackIcon />} variant='outlined' onClick={() => navigate(-1)}>
              {t.back}
            </Button>

            <Button
              endIcon={<KeyboardArrowDownIcon />}
              variant='contained'
              onClick={() =>
                formRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
            >
              {t.sendRequest}
            </Button>
          </Box>

          <Box
            sx={{
              height: { xs: 220, md: 320 },
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: `url(${company.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mb: 3,
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
                left: 24,
                right: 24,
                bottom: 24,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-end',
              }}
            >
              <Avatar
                src={company.logo}
                sx={{
                  width: 88,
                  height: 88,
                  bgcolor: 'white',
                  border: '3px solid white',
                }}
              />

              <Box sx={{ color: 'white' }}>
                <Typography variant='h4'>{company.name}</Typography>

                <Typography variant='subtitle1'>{company.city.toLocaleUpperCase(currentLocale)}</Typography>
              </Box>
            </Box>
          </Box>

          <Paper sx={{ p: 3, borderRadius: 1 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant='body2'>{t.category}</Typography>

                <Typography variant='subtitle1'>
                  {t.categories[company.category as keyof typeof t.categories]}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant='body2'>{t.score}</Typography>

                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Rating readOnly value={company.score} precision={0.1} size='small' />

                  <Typography variant='subtitle1'>{company.score}</Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant='body2'>{t.minimumOrder}</Typography>

                <Typography variant='subtitle1'>
                  {company.minimumOrder} {t.piece}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant='body2'>{t.leadTime}</Typography>

                <Typography variant='subtitle1'>
                  {company.leadTime} {t.day}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6'>{t.certifications}</Typography>

            <Stack direction='row' spacing={1} useFlexGap sx={{ mt: 2 }}>
              {company.certifications.map((item) => {
                const Icon = certificateIcons[item] || VerifiedIcon;

                return (
                  <Chip
                    key={item}
                    icon={<Icon sx={{ fontSize: 18 }} />}
                    label={item}
                    color='warning'
                    variant='outlined'
                    sx={{ pl: 0.5 }}
                  />
                );
              })}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6'>{t.aboutCompany}</Typography>

            <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
              {company.shortDescription}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6'>{t.gallery}</Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              {company.gallery.map((image) => (
                <Grid key={image} size={{ xs: 12, sm: 6 }}>
                  <Box
                    onClick={() => setSelectedImage(image)}
                    sx={{
                      height: 220,
                      borderRadius: 2,
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper
            ref={formRef}
            sx={{
              p: 3,
              borderRadius: 2,
              mt: 3,
            }}
          >
            <RequestForm />
          </Paper>
        </Box>
      </Fade>

      <Modal open={Boolean(selectedImage)} onClose={() => setSelectedImage('')}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'black',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => setSelectedImage('')}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
