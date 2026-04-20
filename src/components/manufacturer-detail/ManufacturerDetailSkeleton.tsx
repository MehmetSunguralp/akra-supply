import { Box, Paper, Skeleton, Stack } from '@mui/material';

export default function ManufacturerDetailSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Skeleton variant='rounded' height={320} sx={{ borderRadius: 1, mb: 3 }} />

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={3}>
          <Stack direction='row' useFlexGap spacing={2} sx={{ flexWrap: 'wrap' }}>
            <Skeleton variant='rounded' height={84} sx={{ flex: '1 1 18%', minWidth: 72, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={84} sx={{ flex: '1 1 18%', minWidth: 72, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={84} sx={{ flex: '1 1 18%', minWidth: 72, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={84} sx={{ flex: '1 1 18%', minWidth: 72, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={84} sx={{ flex: '1 1 28%', minWidth: 160, borderRadius: 1 }} />
          </Stack>

          <Skeleton variant='text' width={180} height={36} />
          <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Skeleton variant='rounded' width={100} height={34} sx={{ borderRadius: 1 }} />
            <Skeleton variant='rounded' width={100} height={34} sx={{ borderRadius: 1 }} />
            <Skeleton variant='rounded' width={100} height={34} sx={{ borderRadius: 1 }} />
          </Stack>

          <Skeleton variant='text' width={180} height={36} />
          <Skeleton variant='text' width='100%' />
          <Skeleton variant='text' width='93%' />
          <Skeleton variant='text' width='88%' />

          <Skeleton variant='text' width={180} height={36} />
          <Stack direction='row' useFlexGap spacing={1.25} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <Skeleton variant='rounded' height={140} sx={{ flex: 1, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={140} sx={{ flex: 1, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={140} sx={{ flex: 1, borderRadius: 1 }} />
            <Skeleton variant='rounded' height={140} sx={{ flex: 1, borderRadius: 1 }} />
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 1,
          mt: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant='text' width={200} height={36} />
          <Skeleton variant='rounded' height={46} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' height={46} sx={{ borderRadius: 1 }} />
          <Skeleton variant='rounded' height={120} sx={{ borderRadius: 1 }} />
        </Stack>
      </Paper>
    </Box>
  );
}
