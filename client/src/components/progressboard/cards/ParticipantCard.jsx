import AwardIcon from '@mui/icons-material/WorkspacePremium'
import { Box, Typography } from '@mui/material'

const ParticipantCard = ({ participant }) => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: {
          xxs: '100%',
          xs: 'calc(50% - 0.5rem)',
          md: '100%',
          lg: 'calc(50% - 0.5rem)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'left',
          backgroundColor: 'info.main',
          boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
          borderRadius: '4px',
          px: { xxs: 0.25, xs: 0.5, sm: 1, md: 1, lg: 1, xl: 1.25 },
          py: { xxs: 0.25, xs: 0.5, sm: 0.5, md: 0.5, lg: 1, xl: 0.5 },
          gap: { xxs: 1, xs: 0.5, sm: 1, md: 1, lg: 0.85, xl: 1.25 },
        }}
      >
        <AwardIcon
          sx={{
            fontSize: {
              xxs: '1.1rem',
              xs: '1.1rem',
              sm: '1.5rem',
              md: '1.2rem',
              lg: '1.3rem',
              xl: '1.75rem',
            },
            color: 'primary.main',
          }}
        />
        <Typography
          sx={{
            fontSize: {
              xxs: '1rem',
              xs: '1rem',
              sm: '1.25rem',
              md: '1.15rem',
              lg: '1.25rem',
              xl: '1.5rem',
            },
            color: 'primary.main',
          }}
        >
          {participant.fullName}
        </Typography>
      </Box>
    </Box>
  )
}

export default ParticipantCard
