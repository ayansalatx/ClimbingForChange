import {
  Box,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from '@mui/material'
import NavigationCard from '../../components/admin/NavigationCard'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import PlaceIcon from '@mui/icons-material/Place'
import TerrainIcon from '@mui/icons-material/Terrain'
import Hiking from '@mui/icons-material/Hiking'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        px: '1.5rem',
      }}
    >
      <Typography
        variant="h1"
        color="primary.main"
        fontWeight={'bold'}
        textTransform={'uppercase'}
        marginBottom={'2rem'}
        sx={{ fontSize: '4rem' }}
      >
        Climbing for Change Dashboard
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: '12rem',
          my: '2rem',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {/* <Paper>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Days to Go</TableCell>
                    <TableCell>Teams</TableCell>
                    <TableCell>Participants</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Box>
        </Paper> */}
        <Button
          onClick={() => navigate('/progress')}
          variant="contained"
          sx={{
            height: '3rem',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 1.5,
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            fontSize="large"
            color="background.paper"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="0.1rem"
          >
            Progress Board
          </Typography>
          <Hiking sx={{ color: 'secondary.main', fontSize: '2rem' }} />
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '12rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <NavigationCard
          cardTitle={'Event Management'}
          cardIcon={EventIcon}
          link={'/admin/events'}
          bgColor={'info.main'}
          iconSize={'12rem'}
          iconColor={'info.light'}
          iconYPosition={'2%'}
          iconXPosition={'38%'}
        />
        <NavigationCard
          cardTitle={'Participant Management'}
          cardIcon={PeopleIcon}
          link={'/admin/participants'}
          bgColor={'secondary.main'}
          iconSize={'16rem'}
          iconColor={'secondary.dark'}
          iconYPosition={'-15%'}
          iconXPosition={'5%'}
        />
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
    </Box>
  )
}

export default AdminDashboard
