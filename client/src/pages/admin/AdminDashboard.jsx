import 'react-multi-carousel/lib/styles.css'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import EventIcon from '@mui/icons-material/Event'
import Hiking from '@mui/icons-material/Hiking'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import { Box, IconButton,Typography } from '@mui/material'
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

        <ProgressBoardButton liveEventExists={liveEventExists}/>
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Event Management'}
              cardIcon={EventIcon}
              link={'/admin/events'}
              bgColor={'info.main'}
              iconSize={'12rem'}
              iconColor={'secondary.light'}
              iconYPosition={'2%'}
              iconXPosition={'38%'}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Team Management'}
              cardIcon={PeopleIcon}
              link={'/admin/teams'}
              bgColor={'info.light'}
              iconSize={'16rem'}
              iconColor={'info.main'}
              iconYPosition={'-15%'}
              iconXPosition={'5%'}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Participant Management'}
              cardIcon={Hiking}
              link={'/admin/participants'}
              bgColor={'info.main'}
              iconSize={'12rem'}
              iconColor={'secondary.light'}
              iconYPosition={''}
              iconXPosition={'42%'}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Mountain Management'}
              cardIcon={TerrainIcon}
              link={'/admin/mountains'}
              bgColor={'info.light'}
              iconSize={'18rem'}
              iconColor={'info.main'}
              iconYPosition={'-25%'}
              iconXPosition={''}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Location Management'}
              cardIcon={PlaceIcon}
              link={'/admin/locations'}
              bgColor={'secondary.main'}
              iconSize={'12rem'}
              iconColor={'secondary.dark'}
              iconYPosition={''}
              iconXPosition={'43%'}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavigationCard
              cardTitle={'Hill Management'}
              cardIcon={DownhillSkiingIcon}
              link={'/admin/hills'}
              bgColor={'secondary.main'}
              iconSize={'12rem'}
              iconColor={'secondary.dark'}
              iconYPosition={''}
              iconXPosition={'35%'}
            />
          </Box>
        </Carousel>
      </Box>
    </Box>
  )
}

export default AdminDashboard
