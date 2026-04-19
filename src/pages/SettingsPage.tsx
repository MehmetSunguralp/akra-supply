import turkeyFlag from '@/assets/turkey.png';
import unitedKingdomFlag from '@/assets/united-kingdom.png';
import { APP_SCROLL_ROOT_ID } from '@/constants/appShell';
import { locales } from '@/locales';
import type { RootState } from '@/store';
import { setLocale } from '@/store/slices/localeSlice';
import { setTheme } from '@/store/slices/themeSlice';
import { THEME_ORDER, themes } from '@/theme/index';
import type { LocaleName } from '@/types/locale';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LANGUAGE_ICONS: Record<LocaleName, string> = {
  tr: turkeyFlag,
  en: unitedKingdomFlag,
};

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale.currentLocale);
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  const t = locales[currentLocale].settingsPage;

  useLayoutEffect(() => {
    document.getElementById(APP_SCROLL_ROOT_ID)?.scrollTo(0, 0);
  }, []);

  return (
    <Box
      component='main'
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        px: { xs: 2, sm: 3 },
        py: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 700, mb: 3 }}>
          {t.title}
        </Typography>

        <Stack spacing={3}>
          <Paper variant='outlined' sx={{ p: 2.5, borderRadius: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
              {t.languageSection}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              {t.languageHint}
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={currentLocale}
              onChange={(_, value: LocaleName | null) => {
                if (value) dispatch(setLocale(value));
              }}
              aria-label={t.languageSection}
              sx={{ gap: 1, flexWrap: 'wrap' }}
            >
              {(['tr', 'en'] as const).map((code) => (
                <ToggleButton
                  key={code}
                  value={code}
                  aria-label={code === 'tr' ? t.languageTurkish : t.languageEnglish}
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    textTransform: 'none',
                    borderRadius: 1,
                    borderWidth: 1,
                  }}
                >
                  <Stack direction='row' spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                      component='img'
                      src={LANGUAGE_ICONS[code]}
                      alt={code === 'tr' ? t.languageTurkish : t.languageEnglish}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      {code === 'tr' ? t.languageTurkish : t.languageEnglish}
                    </Typography>
                  </Stack>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Paper>

          <Paper variant='outlined' sx={{ p: 2.5, borderRadius: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
              {t.themeSection}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
              {t.themeHint}
            </Typography>
            <Grid container spacing={2}>
              {THEME_ORDER.map((themeId) => {
                const palette = themes[themeId].palette;
                const primaryMain =
                  typeof palette.primary === 'string' ? palette.primary : palette.primary.main;
                const secondaryMain =
                  typeof palette.secondary === 'string' ? palette.secondary : palette.secondary.main;
                const selected = currentTheme === themeId;

                const isLightPreview = themeId === 'ocean' || themeId === 'luxury';

                let cardBorderColor: 'divider' | 'primary.main' | (string & {}) = 'divider';
                if (selected) {
                  cardBorderColor = isLightPreview ? 'rgba(15, 23, 42, 0.45)' : 'primary.main';
                }
                const cardShadow =
                  selected && isLightPreview
                    ? '0 0 0 2px #ffffff, 0 0 0 5px rgba(15, 23, 42, 0.35)'
                    : undefined;

                return (
                  <Grid key={themeId} size={{ xs: 12, sm: 6 }}>
                    <Card
                      variant='outlined'
                      sx={{
                        borderRadius: 1,
                        borderWidth: selected ? 2 : 1,
                        borderColor: cardBorderColor,
                        boxShadow: cardShadow,
                        overflow: 'hidden',
                      }}
                    >
                      <CardActionArea onClick={() => dispatch(setTheme(themeId))}>
                        <Box sx={{ display: 'flex', height: 56, position: 'relative' }}>
                          <Box sx={{ flex: 1, bgcolor: primaryMain }} />
                          {isLightPreview ? (
                            <Box
                              aria-hidden
                              sx={{
                                width: 4,
                                flexShrink: 0,
                                bgcolor: '#ffffff',
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.95)',
                              }}
                            />
                          ) : null}
                          <Box sx={{ flex: 1, bgcolor: secondaryMain }} />
                        </Box>
                        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                            {t.themeNames[themeId]}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};
