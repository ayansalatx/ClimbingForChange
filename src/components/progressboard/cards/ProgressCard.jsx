import { Box, Card, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProgressCard = ({ team }) => {
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()

  const handleTap = () => {
    setClicked(true)
  }

  return (
    <Card
      onClick={() => {
        handleTap()
        navigate(`team/${team?.id}`)
      }}
      sx={{
        px: { xxs: 1, xs: 1 },
        py: { xxs: 0.5, xs: 0.5 },
        boxShadow: 3,
        backgroundColor: clicked ? 'secondary.light' : 'background.default',
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
            placement="top"
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
              variant="body1"
              fontSize={{ xxs: '1.05rem', xs: '1.15rem' }}
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing=".015rem"
              color="info.main"
              whiteSpace="nowrap"
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
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.015rem"
            color="secondary.dark"
            whiteSpace="nowrap"
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
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.015rem"
            color="primary.light"
            whiteSpace="nowrap"
          >
            Laps
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 0.4,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                minWidth: '2rem',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                {team.lapsCompleted ?? 0}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                /
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                {team.lapsRequired ?? 0}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing=".015rem"
            color="primary.light"
            whiteSpace="nowrap"
          >
            Best Lap
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              minWidth: { xxs: '2.7rem', xs: '2.85rem' },
            }}
          >
            <Typography
              variant="body1"
              fontSize={{ xxs: '0.9rem', xs: '1rem' }}
              noWrap
            >
              {team.bestLap ?? '00:00'}
            </Typography>
          </Box>
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
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.015rem"
            whiteSpace="nowrap"
          >
            Elev.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 0.4,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                minWidth: '1.78rem',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                {team.currentElevation ?? 0}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                /
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="body1"
                fontSize={{ xxs: '0.9rem', xs: '1rem' }}
                noWrap
              >
                {team.totalElevation ?? 0}
              </Typography>
            </Box>
          </Box>
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
            variant="body1"
            fontSize={{ xxs: '0.95rem', xs: '1.05rem' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing=".015rem"
            color="primary.light"
            whiteSpace="nowrap"
          >
            Time
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              minWidth: { xxs: '4.11rem', xs: '4.4rem' },
            }}
          >
            <Typography
              variant="body1"
              fontSize={{ xxs: '0.9rem', xs: '1rem' }}
              noWrap
            >
              {team.timeElapsed ?? '00:00:00'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default ProgressCard
