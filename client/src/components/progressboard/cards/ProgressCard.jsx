import { Box, Card, Typography } from '@mui/material'

const ProgressCard = ({ team }) => {
  return (
    <Card
      sx={{
        p: 1.25,
        boxShadow: 3,
        backgroundColor: 'background.default',
        color: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} letterSpacing={'.04rem'} color={'info.main'} whiteSpace="nowrap">
            Team:
          </Typography>
          <Typography variant="body1" noWrap>
            {team.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} whiteSpace="nowrap">
            Laps:
          </Typography>
          <Typography variant="body1" noWrap>
            {team.lapsCompleted} / {team.lapsRequired}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} whiteSpace="nowrap">
            Mountain:
          </Typography>
          <Typography variant="body1" noWrap>
            {team.mountainName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} whiteSpace="nowrap">
            Elevation:
          </Typography>
          <Typography variant="body1" noWrap>
            {team.currentElevation} / {team.totalElevation}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} whiteSpace="nowrap">
            Best Lap:
          </Typography>
          <Typography variant="body1" noWrap>
            {team.bestLap}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="body1" fontWeight="bold" textTransform={'uppercase'} whiteSpace="nowrap">
            Time Elapsed
          </Typography>
          <Typography variant="body1" noWrap>
            {team.timeElapsed}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ProgressCard
