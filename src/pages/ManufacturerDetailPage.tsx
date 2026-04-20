import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { APP_SCROLL_ROOT_ID } from '@/constants/appShell';
import { ManufacturerContent } from '@/components/manufacturer-detail/ManufacturerContent';
import { ManufacturerHero } from '@/components/manufacturer-detail/ManufacturerHero';
import { ImagePreviewModal } from '@/components/manufacturer-detail/ImagePreviewModal';
import { RequestSendingOverlay } from '@/components/manufacturer-detail/RequestSendingOverlay';
import ManufacturerDetailSkeleton from '@/components/manufacturer-detail/ManufacturerDetailSkeleton';
import type { RootState } from '@/store';
import { locales } from '@/locales';
import { getCompanyById } from '@/api/apiCalls';
import type { Company } from '@/types/company';
import type { LocaleName } from '@/types/locale';
import { Box, Fade } from '@mui/material';

import VerifiedIcon from '@mui/icons-material/Verified';
import CompostIcon from '@mui/icons-material/Compost';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RecyclingIcon from '@mui/icons-material/Recycling';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
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

  if (loading) return <ManufacturerDetailSkeleton />;
  if (!company) return null;

  return (
    <>
      <Fade in timeout={400}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
            <ManufacturerHero
              companyName={company.name}
              city={company.city}
              logo={company.logo}
              coverImage={company.coverImage}
              locale={currentLocale as LocaleName}
              backLabel={t.back}
              desktopNavWidth={DESKTOP_NAV_WIDTH_PX}
              onBack={() => navigate(-1)}
            />
            <ManufacturerContent
              company={company}
              labels={t}
              certificateIcons={certificateIcons}
              formRef={formRef}
              onImageOpen={setSelectedImage}
              onSendingOverlayChange={setRequestSendingOverlay}
            />
          </Box>
          <RequestSendingOverlay
            open={requestSendingOverlay}
            desktopNavWidth={DESKTOP_NAV_WIDTH_PX}
            label={t.sending}
          />
        </Box>
      </Fade>
      <ImagePreviewModal image={selectedImage} onClose={() => setSelectedImage('')} />
    </>
  );
};
