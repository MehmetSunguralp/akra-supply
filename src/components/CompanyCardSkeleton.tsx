import { Card, Skeleton, Stack } from '@mui/material';

export default function CompanyCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 1, p: 2 }}>
      <Skeleton variant='rounded' height={200} />
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Skeleton variant='text' height={34} width='70%' />
        <Skeleton variant='text' height={24} width='40%' />
        <Skeleton variant='text' height={40} />
      </Stack>
    </Card>
  );
}
