import { Box, Card, Tooltip, Typography } from '@mui/material'

const ProgressCard = ({ team }) => {
  return (
    <Card
      sx={{
        px: { xxs: 1, xs: 1 },
        py: { xxs: 0.5, xs: 0.5 },
        boxShadow: 3,
        backgroundColor: 'background.default',
        color: 'primary.light',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            maxWidth: '70%',
            alignItems: 'flex-start',
          }}
        >
          <Tooltip
            title={team.name ?? ''}
            placement='top'
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: 'info.main',
                  color: 'primary.main',
                  fontSize: {
                    xxs: '0.75rem',
                    xs: '0.85rem',
                  },
                  px: {
                    sm: 1,
                  },
                  py: {
                    sm: 0.5,
                  },
                  borderRadius: 0.5,
                  boxShadow: 3,
                },
              },
            }}
          >
            <Typography
              variant='body1'
              fontSize={{ xxs: '1.05rem', xs: '1.15rem' }}
              fontWeight='bold'
              textTransform={'uppercase'}
              letterSpacing={'.015rem'}
              color={'info.main'}
              whiteSpace='nowrap'
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              {team.name ?? ''}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
            justifyContent: 'right',
          }}
        >
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight='bold'
            textTransform={'uppercase'}
            letterSpacing={'0.015rem'}
            color='secondary.dark'
            whiteSpace='nowrap'
          >
            {team.mountainName ?? ''}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight='bold'
            textTransform={'uppercase'}
            letterSpacing={'0.015rem'}
            color={'primary.light'}
            whiteSpace='nowrap'
          >
            Laps
          </Typography>

          <Typography
            variant='body1'
            fontSize={{ xxs: '0.9rem', xs: '1rem' }}
            noWrap
          >
            {team.lapsCompleted ?? 0} / {team.lapsRequired ?? 0}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight='bold'
            textTransform={'uppercase'}
            letterSpacing={'.015rem'}
            color={'primary.light'}
            whiteSpace='nowrap'
          >
            Best Lap
          </Typography>

          <Typography
            variant='body1'
            fontSize={{ xxs: '0.9rem', xs: '1rem' }}
            noWrap
          >
            {team.bestLap ?? '00:00'}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight='bold'
            textTransform={'uppercase'}
            letterSpacing={'0.015rem'}
            whiteSpace='nowrap'
          >
            Elev.
          </Typography>

          <Typography
            variant='body1'
            fontSize={{ xxs: '0.9rem', xs: '1rem' }}
            noWrap
          >
            {team.currentElevation ?? 0} / {team.totalElevation ?? 0}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'right',
          }}
        >
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight='bold'
            textTransform={'uppercase'}
            letterSpacing={'.015rem'}
            color={'primary.light'}
            whiteSpace='nowrap'
          >
            Time
          </Typography>
          <Typography
            variant='body1'
            fontSize={{ xxs: '0.9rem', xs: '1rem' }}
            noWrap
          >
            {team.timeElapsed ?? '00:00:00'}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default ProgressCard
