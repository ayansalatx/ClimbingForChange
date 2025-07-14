import 'react-multi-carousel/lib/styles.css'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import EventIcon from '@mui/icons-material/Event'
import Hiking from '@mui/icons-material/Hiking'
import RfidIcon from '@mui/icons-material/Nfc'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

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
    <ArrowBackIos fontSize='large' />
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
    <ArrowForwardIos fontSize='large' />
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
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(true)
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
      }finally {
        setLoading(false)
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
      iconSize: '8.8rem',
      iconY: '5%',
      iconX: '39%',
    },
    {
      title: 'Team Management',
      icon: PeopleIcon,
      link: '/admin/teams',
      iconSize: '10.5rem',
      iconY: '-3%',
      iconX: '23%',
    },
    {
      title: 'Participant Management',
      icon: Hiking,
      link: '/admin/participants',
      iconSize: '7.8rem',
      iconY: '5%',
      iconX: '48%',
    },
    {
      title: 'RFID Management',
      icon: RfidIcon,
      link: '/admin/rfid',
      iconSize: '8.4rem',
      iconY: '5%',
      iconX: '38%',
    },
    {
      title: 'Mountain Management',
      icon: TerrainIcon,
      link: '/admin/mountains',
      iconSize: '13rem',
      iconY: '-20%',
      iconX: '8%',
    },
    {
      title: 'Location Management',
      icon: PlaceIcon,
      link: '/admin/locations',
      bgColor: 'secondary.main',
      iconSize: '9rem',
      iconY: '',
      iconX: '43%',
    },
    {
      title: 'Hill Management',
      icon: DownhillSkiingIcon,
      link: '/admin/hills',
      iconSize: '7.8rem',
      iconY: '6%',
      iconX: '42%',
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 2.25, md: 2.5, lg: 2.5, xl: 2.5 },
        gap: 1,
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '1.5rem',
          pb: 1,
        }}
      >
        <Typography
          variant='h1'
          color='primary.main'
          fontWeight='bold'
          textTransform='uppercase'
          fontStyle='italic'
          fontSize={{
            xxs: '2rem',
            sm: '2.25rem',
            md: '2.35rem',
            lg: '2.5rem',
            xl: '3.15rem',
          }}
          lineHeight={{
            xxs: '2rem',
            sm: '2.25rem',
            md: '2.35rem',
            lg: '2.5rem',
            xl: '3.15rem',
          }}
          align='left'
        >
          Progressboard Management
        </Typography>

        <ProgressBoardButton liveEventExists={liveEventExists} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '2400px',
          flexDirection: 'row',
          px: '1.5rem',
          alignItems: 'left',
        }}
      >
        <EventSummaryTable events={events} loading={loading} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '4rem',
          left: 0,
          width: '100%',
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
  )
}

export default AdminDashboard
