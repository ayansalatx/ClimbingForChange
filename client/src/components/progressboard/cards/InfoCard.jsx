// components/StatRow.jsx
import { Box, Typography } from '@mui/material'

const InfoCard = ({ label, icon, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: icon ? ' space-evenly' : 'space-between',
        alignItems: 'center',
        flex: 1,
        py: { xxs: 0.5, sm: 1, md: 0.65, lg: 1, xl: 1 },
        px: { xxs: 0.85, sm: 1, md: 0.85, lg: 1.25, xl: 2 },
        borderRadius: '4px',
        backgroundColor: 'secondary.main',
        boxShadow: '1px 1px 4px rgba(48, 51, 31, 0.3)',
      }}
    >
      <Box
        sx={{
          display: { xxs: 'flex', xs: 'auto' },
          width: { md: '100%', lg: 'auto' },
          alignItems: { xxs: 'center', xs: 'auto' },
          gap: icon && label ? { xxs: 0.5 } : 0,
        }}
      >
        {icon}
        <Typography
          variant="h6"
          color="primary.main"
          sx={{
            fontSize: {
              xxs: '0.9rem',
              xs: '0.95rem',
              md: '1rem',
              lg: '1rem',
              xl: '1.2rem',
            },
            textAlign: { xxs: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            lineHeight: {
              xxs: '1rem',
              xs: '1.1rem',
              sm: '1rem',
              lg: '1.5rem',
            },
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
            fontSize: {
              xxs: '0.9rem',
              xs: '0.95rem',
              md: '.95rem',
              lg: '1rem',
              xl: '1.2rem',
            },
            textAlign: { xxs: 'center', lg: 'right' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            lineHeight: !icon ? { xxs: '1.5rem', xs: '1.1rem', sm: '1rem', lg: '1.5rem' } : { xxs: '1rem', xs: '1.1rem', sm: '1rem', lg: '1.5rem' },
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoCard
