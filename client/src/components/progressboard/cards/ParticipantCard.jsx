import AwardIcon from '@mui/icons-material/WorkspacePremium'
import { Box, Typography } from '@mui/material'

const ParticipantCard = ({ participant }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          backgroundColor: 'info.main',
          boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
          borderRadius: '4px',
          px: 2,
          gap: 2,
        }}
      >
        <AwardIcon
          sx={{
            fontSize: {
              xxs: '.8rem',
              xs: '.8rem',
              sm: '1.05rem',
              md: '1.3rem',
              lg: '1.3rem',
              xl: '2rem',
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
              md: '1.5rem',
              lg: '1.5rem',
              xl: '2rem',
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
