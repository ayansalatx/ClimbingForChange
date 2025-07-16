import AwardIcon from '@mui/icons-material/WorkspacePremium'
import { Box, Typography } from '@mui/material'

const ParticipantCard = ({ participant }) => {
  return (
    <Box
      sx={{
        flex: {
          xs: '1 1 100%',
          lg: '1 1 calc(50% - 0.5rem)',
        },
        boxSizing: 'border-box',
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
          px: { md: 1, lg: 1.25, xl: 2 },
          py: { md: 0.5, lg: 1, xl: 0.5 },
          gap: { md: 1, lg: 1.25, xl: 2 },
        }}
      >
        <AwardIcon
          sx={{
            fontSize: {
              xxs: '0.8rem',
              xs: '0.8rem',
              sm: '0.95rem',
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
              lg: '1.35rem',
              xl: '1.65rem',
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
