// components/StatRow.jsx
import { Box, Typography } from '@mui/material'

const InfoCard = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
        py: 0.75,
        px: 1.5,
        borderRadius: '4px',
        backgroundColor: 'secondary.main',
        boxShadow: '1px 1px 4px rgba(48, 51, 31, 0.3)',
      }}
    >
      <Box>
        <Typography
          variant='h6'
          color='primary.main'
          sx={{
            textAlign: 'left',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            pb: '4px',
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant='h6'
          color='primary.main'
          sx={{
            textAlign: 'right',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            pb: '4px',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoCard
