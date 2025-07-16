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
        py: { md: 0.5, lg: 0.65, xl: 0.75 },
        px: { md: .85, lg: 1.25, xl: 1.5 },
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
            fontSize: { md: '1rem', lg: '1rem', xl: 'auto' },
            textAlign: { md: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            pb: { md: 0, lg: '1px' },
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
            fontSize: { md: '1rem', lg: '1rem', xl: 'auto' },
            textAlign: { md: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            lineHeight: { md: '1.05rem', lg: 'auto' },
            pb: { md: '3px', lg: '1px' },
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoCard
