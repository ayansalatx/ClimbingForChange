import 'react-multi-carousel/lib/styles.css'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import EventIcon from '@mui/icons-material/Event'
import Hiking from '@mui/icons-material/Hiking'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import NavigationCard from '../../components/admin/NavigationCard'
import EventSummaryTable from '../../components/admin/tables/EventsSummaryTable'
import { useAlert } from '../../hooks/useAlert'
import { getUpcomingEventsSummary } from '../../services/eventService'
import ProgressBoardButton from '../../components/admin/buttons/ProgressBoardButton'

const CustomLeftArrow = ({ onClick }) => (
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

const CustomRightArrow = ({ onClick }) => (
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
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1400, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}

const AdminDashboard = () => {
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
      bgColor: 'info.main',
      iconSize: '12rem',
      iconColor: 'secondary.light',
      iconY: '2%',
      iconX: '38%',
    },
    {
      title: 'Team Management',
      icon: PeopleIcon,
      link: '/admin/teams',
      bgColor: 'info.light',
      iconSize: '16rem',
      iconColor: 'info.main',
      iconY: '-15%',
      iconX: '5%',
    },
    {
      title: 'Participant Management',
      icon: Hiking,
      link: '/admin/participants',
      bgColor: 'info.main',
      iconSize: '12rem',
      iconColor: 'secondary.light',
      iconY: '',
      iconX: '42%',
    },
    {
      title: 'Mountain Management',
      icon: TerrainIcon,
      link: '/admin/mountains',
      bgColor: 'info.light',
      iconSize: '18rem',
      iconColor: 'info.main',
      iconY: '-25%',
      iconX: '',
    },
    {
      title: 'Location Management',
      icon: PlaceIcon,
      link: '/admin/locations',
      bgColor: 'secondary.main',
      iconSize: '12rem',
      iconColor: 'secondary.dark',
      iconY: '',
      iconX: '43%',
    },
    {
      title: 'Hill Management',
      icon: DownhillSkiingIcon,
      link: '/admin/hills',
      bgColor: 'secondary.main',
      iconSize: '12rem',
      iconColor: 'secondary.dark',
      iconY: '',
      iconX: '35%',
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgColor: 'background.main',
        py: 3,
      }}
    >
      <Typography
        variant="h1"
        color="primary.main"
        fontWeight={'bold'}
        textTransform={'uppercase'}
        sx={{ fontSize: '3.5rem' }}
      >
        Leaderboard Management
      </Typography>

      <Box
        sx={{
          width: '100%',
          my: '2rem',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Box width={'65%'}>
          <EventSummaryTable events={events} />
        </Box>

        <ProgressBoardButton liveEventExists={liveEventExists} />
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundColor: 'primary.light',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Carousel
          responsive={responsive}
          infinite
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          autoPlay
        >
          {navCardData.map((card, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <NavigationCard
                cardTitle={card.title}
                cardIcon={card.icon}
                link={card.link}
                bgColor={card.bgColor}
                iconSize={card.iconSize}
                iconColor={card.iconColor}
                iconYPosition={card.iconY}
                iconXPosition={card.iconX}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default AdminDashboard
