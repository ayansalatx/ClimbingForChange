import { Box, Card, Typography } from '@mui/material'

const ProgressCard = ({ team }) => {
  return (
    <Card
      sx={{
        p: { xxs: 1, xs: 1.25 },
        boxShadow: 3,
        backgroundColor: 'background.default',
        color: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        gap: { xxs: 0.2, xs: 0.5 },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography
            variant="body1"
            fontSize={{ xxs: '1.05rem', xs: '1.15rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.04rem'}
            color={'info.main'}
            whiteSpace="nowrap"
          >
            Team
          </Typography>
          <Typography variant="body1" fontSize={{ xxs: '0.95rem', xs: '1.05rem' }} noWrap>
            {team.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            fontSize={{ xxs: '1.05rem', xs: '1.15rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.04rem'}
            color={'info.main'}
            whiteSpace="nowrap"
          >
            Laps
          </Typography>
          <Typography variant="body1" fontSize={{ xxs: '0.9rem', xs: '1rem' }} noWrap>
            {team.lapsCompleted} / {team.lapsRequired}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.04rem'}
            whiteSpace="nowrap"
          >
            Mount.
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
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.04rem'}
            whiteSpace="nowrap"
          >
            Elev.
          </Typography>
          <Typography variant="body1" fontSize={{ xxs: '0.9rem', xs: '1rem' }} noWrap>
            {team.currentElevation} / {team.totalElevation}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.05rem'}
            color={'secondary.dark'}
            whiteSpace="nowrap"
          >
            Best Lap
          </Typography>
          <Typography variant="body1" fontSize={{ xxs: '0.9rem', xs: '1rem' }} noWrap>
            {team.bestLap}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform={'uppercase'}
            letterSpacing={'.05rem'}
            color={'secondary.dark'}
            whiteSpace="nowrap"
          >
            Time
          </Typography>
          <Typography variant="body1" fontSize={{ xxs: '0.9rem', xs: '1rem' }} noWrap>
            {team.timeElapsed}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ProgressCard
