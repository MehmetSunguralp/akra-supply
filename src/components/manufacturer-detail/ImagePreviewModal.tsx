import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

type ImagePreviewModalProps = {
  image: string;
  onClose: () => void;
};

export const ImagePreviewModal = ({ image, onClose }: ImagePreviewModalProps) => {
  return (
    <Modal open={Boolean(image)} onClose={onClose} hideBackdrop>
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
        onClick={onClose}
      >
        <Box
          onClick={(event) => event.stopPropagation()}
          sx={{
            position: 'relative',
            width: { xs: '96vw', sm: 'min(820px, 88vw)' },
            maxHeight: { xs: '80vh', sm: '70vh' },
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 24,
            overflow: 'hidden',
          }}
        >
          <IconButton
            onClick={onClose}
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
            src={image}
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
  );
};
