import { Box, Stack } from '@mui/material';

import type { ManufacturerGalleryProps } from '@/types/ManufacturerGalleryProps';

const CHUNK = 4;

function chunkImages(urls: string[]) {
  const rows: string[][] = [];
  for (let i = 0; i < urls.length; i += CHUNK) {
    rows.push(urls.slice(i, i + CHUNK));
  }
  return rows;
}

function GalleryRow({
  urls,
  onImageOpen,
}: Readonly<{ urls: string[]; onImageOpen: (url: string) => void }>) {
  return (
    <Stack direction='row' spacing={1.25} sx={{ width: '100%', minHeight: 0 }}>
      {urls.map((url) => (
        <Box
          key={url}
          role='button'
          tabIndex={0}
          onClick={() => onImageOpen(url)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onImageOpen(url);
            }
          }}
          sx={{
            flex: '1 1 0',
            minWidth: 0,
            height: { xs: 132, sm: 168, md: 250 },
            borderRadius: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'divider',
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'filter 0.24s ease, box-shadow 0.24s ease',
            filter: 'grayscale(100%)',
            outline: 'none',
            '&:hover': {
              filter: 'grayscale(0%)',
              boxShadow: 3,
            },
            '&:focus-visible': {
              filter: 'grayscale(0%)',
              boxShadow: (theme) =>
                `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.primary.main}`,
            },
          }}
        />
      ))}
    </Stack>
  );
}

export default function ManufacturerGallery({ images, onImageOpen }: Readonly<ManufacturerGalleryProps>) {
  if (images.length === 0) {
    return null;
  }

  const rows = chunkImages(images);

  return (
    <Stack spacing={1.75} sx={{ mt: 2 }}>
      {rows.map((rowUrls, rowIndex) => (
        <GalleryRow
          key={`${rowIndex}-${rowUrls.join('~')}`}
          urls={rowUrls}
          onImageOpen={onImageOpen}
        />
      ))}
    </Stack>
  );
}
