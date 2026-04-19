import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { APP_SCROLL_ROOT_ID } from '@/constants/appShell';
import RequestForm from '@/components/RequestForm';
import ManufacturerGallery from '@/components/ManufacturerGallery';
import ManufacturerDetailSkeleton from '@/components/ManufacturerDetailSkeleton';
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
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import VerifiedIcon from '@mui/icons-material/Verified';
import CompostIcon from '@mui/icons-material/Compost';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RecyclingIcon from '@mui/icons-material/Recycling';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import type { SvgIconComponent } from '@mui/icons-material';

const DESKTOP_NAV_WIDTH_PX = 240;

export const ManufacturerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);

  const t = locales[currentLocale].common;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [requestSendingOverlay, setRequestSendingOverlay] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    document.getElementById(APP_SCROLL_ROOT_ID)?.scrollTo(0, 0);
  }, [id]);

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
    return <ManufacturerDetailSkeleton />;
  }

  if (!company) return null;

  return (
    <>
      <Fade in timeout={400}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ p: 3 }}>
          <IconButton
            onClick={() => navigate(-1)}
            aria-label={t.back}
            sx={{
              position: 'fixed',
              top: 32,
              left: { xs: 16, md: `calc(${DESKTOP_NAV_WIDTH_PX}px + 32px)` },
              zIndex: 1200,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 2,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

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
                  }}
                >
                  {company.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 0.5 }}>
                  <PlaceIcon fontSize='large' sx={{ color: 'primary.light' }} />
                  <Typography
                    variant='h4'
                    sx={{
                      color: 'common.white',
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      fontWeight: 500,
                    }}
                  >
                    {company.city.toLocaleUpperCase(currentLocale)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 6, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <CategoryIcon fontSize='large' sx={{ color: 'action.active' }} />
                  <Typography variant='h5' color='text.secondary' sx={{ fontWeight: 600 }}>
                    {t.category}
                  </Typography>
                </Box>

                <Typography variant='h6' sx={{ fontWeight: 600, mt: 0.5 }}>
                  {t.categories[company.category as keyof typeof t.categories]}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <ThumbUpIcon fontSize='large' sx={{ color: 'action.active' }} />
                  <Typography variant='h5' color='text.secondary' sx={{ fontWeight: 600 }}>
                    {t.score}
                  </Typography>
                </Box>

                <Stack direction='row' spacing={1} sx={{ mt: 0.5, alignItems: 'center' }}>
                  <Rating readOnly value={company.score} precision={0.1} size='medium' />

                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {company.score}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <LocalOfferIcon fontSize='large' sx={{ color: 'action.active' }} />
                  <Typography variant='h5' color='text.secondary' sx={{ fontWeight: 600 }}>
                    {t.minimumOrder}
                  </Typography>
                </Box>

                <Typography variant='h6' sx={{ fontWeight: 600, mt: 0.5 }}>
                  {company.minimumOrder} {t.piece}
                </Typography>
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <WatchLaterIcon fontSize='large' sx={{ color: 'action.active' }} />
                  <Typography variant='h5' color='text.secondary' sx={{ fontWeight: 600 }}>
                    {t.leadTime}
                  </Typography>
                </Box>

                <Typography variant='h6' sx={{ fontWeight: 600, mt: 0.5 }}>
                  {company.leadTime} {t.day}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'stretch', md: 'flex-end' },
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Button
                    variant='contained'
                    size='large'
                    startIcon={<SendIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() =>
                      formRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }
                    sx={{
                      py: 1.75,
                      px: 3,
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      width: { xs: '100%', md: 'auto' },
                      minHeight: 52,
                    }}
                  >
                    {t.sendRequest}
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {t.certifications}
            </Typography>

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
                    size='medium'
                  />
                );
              })}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {t.aboutCompany}
            </Typography>

            <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
              {company.shortDescription}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {t.gallery}
            </Typography>

            <ManufacturerGallery images={company.gallery} onImageOpen={setSelectedImage} />
          </Paper>

          <Paper
            ref={formRef}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 1,
              mt: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <RequestForm onSendingOverlayChange={setRequestSendingOverlay} />
          </Paper>
          </Box>

          {requestSendingOverlay ? (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: { xs: 0, md: `${DESKTOP_NAV_WIDTH_PX}px` },
                right: 0,
                height: '100dvh',
                zIndex: 1100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.32)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <CircularProgress size={48} sx={{ color: 'common.white' }} />
                <Typography variant='body1' sx={{ color: 'common.white', fontWeight: 600 }}>
                  {t.sending}
                </Typography>
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Fade>

      <Modal open={Boolean(selectedImage)} onClose={() => setSelectedImage('')} hideBackdrop>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            outline: 'none',
            bgcolor: 'rgba(0, 0, 0, 0.48)',
          }}
          tabIndex={-1}
          onClick={() => setSelectedImage('')}
        >
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              position: 'relative',
              width: 'min(820px, 88vw)',
              maxHeight: '70vh',
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 24,
              overflow: 'hidden',
            }}
          >
            <IconButton
              onClick={() => setSelectedImage('')}
              size='small'
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 2,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>

            <Box
              component='img'
              src={selectedImage}
              alt=''
              sx={{
                display: 'block',
                width: '100%',
                maxHeight: 'min(62vh, calc(70vh - 24px))',
                objectFit: 'contain',
                bgcolor: 'background.default',
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
