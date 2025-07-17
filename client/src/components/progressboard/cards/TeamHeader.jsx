import { alpha, Box, Typography } from '@mui/material'

import theme from '../../../styles/theme'

const TeamHeader = ({ teamName }) => {
  return (
    <Box
      sx={{
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        boxShadow: '0px 3px 0 rgba(0, 0, 0, 0.3)',
        px: 2,
        py: { xxs:.25 , md: 0 },
      }}
    >
      <Typography
        variant="h1"
        color="primary.light"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing=".05rem"
        sx={{
          fontStyle: 'italic',
          fontSize: {
            xxs: '1.25rem',
            xs: '1.65rem',
            sm: '2.1rem',
            md: '3rem',
            lg: '3.5rem',
            xl: '4rem',
          },
          pb:{ xxs: 0, xs: .5, sm: .5, lg: 1 },
        }}
      >
        {teamName}
      </Typography>
    </Box>
  )
}

export default TeamHeader
