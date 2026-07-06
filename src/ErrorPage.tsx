import { Button, Container, Stack, Typography } from '@mui/material'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ErrorPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm">
      <Stack
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        textAlign="center"
      >
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 90,
            color: 'error.main',
          }}
        />

        <Typography variant="h1" fontWeight={700}>
          404
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {t('error.title')}
        </Typography>

        <Typography color="text.secondary">
          {t('error.description')}
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeRoundedIcon />}
          onClick={() => navigate('/')}
            sx={{
               textTransform: 'capitalize',
              '& .MuiButton-startIcon': {
                marginInlineEnd: '10px',
              },
            }}
        >
          {t('error.goHome')}
        </Button>
      </Stack>
    </Container>
  )
}