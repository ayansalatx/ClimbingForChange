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
        py: { md: 0.65, lg: 1, xl: 1 },
        px: { md: .85, lg: 1.25, xl: 2 },
        borderRadius: '4px',
        backgroundColor: 'secondary.main',
        boxShadow: '1px 1px 4px rgba(48, 51, 31, 0.3)',
      }}
    >
      <Box width={{ md: '100%', lg: 'auto' }}>
        <Typography
          variant="h6"
          color="primary.main"
          sx={{
            fontSize: { md: '1rem', lg: '1rem', xl: '1.2rem' },
            textAlign: { md: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            lineHeight: { md: '1rem', lg: '1.5rem' },
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box width={{ md: '100%', lg: 'auto' }}>
        <Typography
          variant="h6"
          color="primary.main"
          sx={{
            fontSize: { md: '.95rem', lg: '1rem', xl: '1.2rem' },
            textAlign: { md: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            lineHeight: { md: '1rem', lg: '1.5rem' },
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoCard
