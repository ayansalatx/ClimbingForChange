import 'react-multi-carousel/lib/styles.css'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import EventIcon from '@mui/icons-material/Event'
import Hiking from '@mui/icons-material/Hiking'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import theme from '../../styles/theme'
import ProgressBoardButton from '../../components/admin/buttons/ProgressBoardButton'
import NavigationCard from '../../components/admin/NavigationCard'
import EventSummaryTable from '../../components/admin/tables/EventsSummaryTable'
import { useAlert } from '../../hooks/useAlert'
import { getUpcomingEventsSummary } from '../../services/eventService'

const CarouselLeftArrow = ({ onClick }) => (
  <IconButton
    onClick={(e) => {
      e.currentTarget.blur()
      onClick()
    }}
    sx={{
      position: 'absolute',
      left: 0,
      top: '40%',
      zIndex: 10,
      p: 0.25,
      color: 'background.paper',
      '&:hover': {
        color: 'secondary.main',
      },
      '&:focus': {
        outline: 'none',
        color: 'secondary.main',
      },
    }}
  >
    <ArrowBackIos fontSize="large" />
  </IconButton>
)

const CarouselRightArrow = ({ onClick }) => (
  <IconButton
    onClick={(e) => {
      e.currentTarget.blur()
      onClick()
    }}
    sx={{
      position: 'absolute',
      right: 0,
      top: '40%',
      zIndex: 10,
      p: 0.25,
      color: 'background.paper',
      '&:hover': {
        color: 'secondary.main',
      },
      '&:focus': {
        outline: 'none',
        color: 'secondary.main',
      },
    }}
  >
    <ArrowForwardIos fontSize="large" />
  </IconButton>
)

const responsive = {
  xlDesktop: {
    breakpoint: { max: 3000, min: 1700 },
    items: 5,
  },
  lgDesktop: {
    breakpoint: { max: 1700, min: 1200 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

const AdminDashboard = () => {
  const isLg = useMediaQuery(theme.breakpoints.up('xl'))
  const [events, setEvents] = useState()

  const displayAlert = useAlert()

  useEffect(() => {
    async function loadData() {
      try {
        const eventList = await getUpcomingEventsSummary()
        displayAlert(
          'Fresh backend data',
          `Loaded ${eventList.length} events from the backend.`,
          'success'
        )
        setEvents(eventList)
      } catch (error) {
        displayAlert(
          'Error',
          `Failed to Load Locations: ${error.message}`,
          'error'
        )
      }
    }

    loadData()
  }, [displayAlert])

  const liveEventExists = events?.some((event) => event.isLive)

  const navCardData = [
    {
      title: 'Event Management',
      icon: EventIcon,
      link: '/admin/events',
      iconSize: '7.8rem',
      iconY: '5%',
      iconX: '44%',
    },
    {
      title: 'Team Management',
      icon: PeopleIcon,
      link: '/admin/teams',
      iconSize: '9rem',
      iconY: '',
      iconX: '33%',
    },
    {
      title: 'Participant Management',
      icon: Hiking,
      link: '/admin/participants',
      iconSize: '7rem',
      iconY: '5%',
      iconX: '52%',
    },
    {
      title: 'Mountain Management',
      icon: TerrainIcon,
      link: '/admin/mountains',
      iconSize: '12rem',
      iconY: '-25%',
      iconX: '14%',
    },
    {
      title: 'Location Management',
      icon: PlaceIcon,
      bgColor: 'secondary.main',
      iconSize: '8rem',
      iconY: '',
      iconX: '47%',
    },
    {
      title: 'Hill Management',
      icon: DownhillSkiingIcon,
      link: '/admin/hills',
      iconSize: '7.5rem',
      iconY: '',
      iconX: '45%',
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1,
        mb: 1,
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h1"
        color="primary.main"
        fontWeight={'bold'}
        textTransform={'uppercase'}
        sx={{ fontSize: { xxs: '2.5rem', xl: '2.75rem' } }}
      >
        Leaderboard Management
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '2400px',
            flexDirection: 'row',
            gap: isLg ? 1 : '1rem',
            px: '1rem',
            display: 'flex',
            alignItems: 'left',
            justifyContent: isLg ? 'space-around' : 'space-between',
          }}
        >
          <Box>
            <EventSummaryTable events={events} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ProgressBoardButton liveEventExists={liveEventExists} />
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            mt: 1,
            backgroundColor: 'primary.light',
            padding: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Carousel
            responsive={responsive}
            infinite
            customLeftArrow={<CarouselLeftArrow />}
            customRightArrow={<CarouselRightArrow />}
            autoPlay
          >
            {navCardData.map((card, index) => {
              const bgColor = index % 2 === 0 ? 'info.light' : 'secondary.main'
              const iconColor = index % 2 === 0 ? 'info.main' : 'secondary.dark'
              return (
                <Box
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <NavigationCard
                    cardTitle={card.title}
                    cardIcon={card.icon}
                    link={card.link}
                    bgColor={bgColor}
                    iconSize={card.iconSize}
                    iconColor={iconColor}
                    iconYPosition={card.iconY}
                    iconXPosition={card.iconX}
                  />
                </Box>
              )
            })}
          </Carousel>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminDashboard
