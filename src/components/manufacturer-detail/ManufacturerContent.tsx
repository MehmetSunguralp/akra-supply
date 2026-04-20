import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SendIcon from '@mui/icons-material/Send';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import VerifiedIcon from '@mui/icons-material/Verified';
import type { SvgIconComponent } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Paper, Rating, Stack, Typography } from '@mui/material';

import ManufacturerGallery from '@/components/manufacturer-detail/ManufacturerGallery';
import RequestForm from '@/components/request-form/RequestForm';
import type { Company } from '@/types/company';

type ManufacturerContentProps = {
  company: Company;
  labels: {
    category: string;
    score: string;
    minimumOrder: string;
    leadTime: string;
    piece: string;
    day: string;
    sendRequest: string;
    certifications: string;
    aboutCompany: string;
    gallery: string;
    categories: Record<string, string>;
  };
  certificateIcons: Record<string, SvgIconComponent>;
  formRef: React.RefObject<HTMLDivElement | null>;
  onImageOpen: (value: string) => void;
  onSendingOverlayChange?: (isSending: boolean) => void;
};

export const ManufacturerContent = ({
  company,
  labels,
  certificateIcons,
  formRef,
  onImageOpen,
  onSendingOverlayChange,
}: ManufacturerContentProps) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2.25, md: 3 },
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={{ xs: 2, md: 2.5, xl: 3 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 6, md: 6, xl: 2 }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <CategoryIcon sx={{ color: 'action.active', fontSize: { xs: 18, md: 22, xl: 30 } }} />
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontWeight: 600, fontSize: { xs: '0.74rem', md: '1rem', xl: '1.2rem' } }}
              >
                {labels.category}
              </Typography>
            </Box>
            <Typography variant='h6' sx={{ fontWeight: 600, mt: 0.5, fontSize: { xs: '0.82rem', md: '1rem', xl: '1.1rem' } }}>
              {labels.categories[company.category]}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 6, xl: 2 }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <ThumbUpIcon sx={{ color: 'action.active', fontSize: { xs: 18, md: 22, xl: 30 } }} />
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontWeight: 600, fontSize: { xs: '0.74rem', md: '1rem', xl: '1.2rem' } }}
              >
                {labels.score}
              </Typography>
            </Box>
            <Stack direction='row' spacing={1} sx={{ mt: 0.5, alignItems: 'center' }}>
              <Rating readOnly value={company.score} precision={0.1} size='small' />
              <Typography variant='h6' sx={{ fontWeight: 600, fontSize: { xs: '0.82rem', md: '1rem', xl: '1.1rem' } }}>
                {company.score}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 6, xl: 2 }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <LocalOfferIcon sx={{ color: 'action.active', fontSize: { xs: 18, md: 22, xl: 30 } }} />
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontWeight: 600, fontSize: { xs: '0.74rem', md: '1rem', xl: '1.2rem' } }}
              >
                {labels.minimumOrder}
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 600, mt: 0.5, fontSize: { xs: '0.82rem', md: '1rem', xl: '1.1rem' }, whiteSpace: 'nowrap' }}
            >
              {company.minimumOrder} {labels.piece}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 6, xl: 2 }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <WatchLaterIcon sx={{ color: 'action.active', fontSize: { xs: 18, md: 22, xl: 30 } }} />
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontWeight: 600, fontSize: { xs: '0.74rem', md: '1rem', xl: '1.2rem' } }}
              >
                {labels.leadTime}
              </Typography>
            </Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 600, mt: 0.5, fontSize: { xs: '0.82rem', md: '1rem', xl: '1.1rem' }, whiteSpace: 'nowrap' }}
            >
              {company.leadTime} {labels.day}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 12, xl: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'stretch', xl: 'flex-end' },
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
                  py: { xs: 1.1, md: 1.25, xl: 1.75 },
                  px: { xs: 1.5, md: 2.25, xl: 3 },
                  fontSize: { xs: '0.82rem', md: '0.88rem', xl: '0.95rem' },
                  fontWeight: 600,
                  width: { xs: '100%', md: '100%', xl: 'auto' },
                  minHeight: { xs: 42, md: 46, xl: 52 },
                }}
              >
                {labels.sendRequest}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {labels.certifications}
        </Typography>
        <Stack direction='row' spacing={1} useFlexGap sx={{ mt: 2, flexWrap: 'wrap' }}>
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
          {labels.aboutCompany}
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }}>
          {company.shortDescription}
        </Typography>

        <Divider sx={{ my: 3 }} />
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          {labels.gallery}
        </Typography>
        <ManufacturerGallery images={company.gallery} onImageOpen={onImageOpen} />
      </Paper>

      <Paper
        ref={formRef}
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2.25, md: 3 },
          borderRadius: 1,
          mt: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <RequestForm onSendingOverlayChange={onSendingOverlayChange} />
      </Paper>
    </>
  );
};
