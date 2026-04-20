import { Box, CircularProgress, Stack, Typography } from '@mui/material';

type RequestSendingOverlayProps = {
  open: boolean;
  desktopNavWidth: number;
  label: string;
};

export const RequestSendingOverlay = ({ open, desktopNavWidth, label }: RequestSendingOverlayProps) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 0, md: `${desktopNavWidth}px` },
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
          {label}
        </Typography>
      </Stack>
    </Box>
  );
};
