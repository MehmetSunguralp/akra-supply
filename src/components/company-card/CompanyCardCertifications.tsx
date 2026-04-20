import VerifiedIcon from '@mui/icons-material/Verified';
import type { SvgIconComponent } from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';

type CompanyCardCertificationsProps = {
  certifications: string[];
  iconMap: Record<string, SvgIconComponent>;
};

export const CompanyCardCertifications = ({ certifications, iconMap }: CompanyCardCertificationsProps) => {
  return (
    <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2.5 }}>
      {certifications.map((certificate) => {
        const Icon = iconMap[certificate] || VerifiedIcon;
        return (
          <Chip
            key={certificate}
            icon={<Icon sx={{ fontSize: 18 }} />}
            label={certificate}
            size='small'
            color='warning'
            variant='outlined'
            sx={{ pl: 0.5 }}
          />
        );
      })}
    </Stack>
  );
};
