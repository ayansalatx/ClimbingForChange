import { Box,Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import ProgressSearch from '../../components/progress/ProgressSearch'
import ProgressTable from '../../components/progress/ProgressTable'
// temporary mock data
import mockData from '../../mock-data/progressboard-team-only.json'
import { fetchParticipants } from '../../services/progressService'

// Define columns for full width screen
const fullColumns = [
  { id: 'teamName', label: 'Team', minWidth: 200 },
  { id: 'mountain', label: 'Mountain', minWidth: 115 },
  { id: 'elevation', label: 'Elevation', minWidth: 60 },
  { id: 'current-elevation', label: 'Current Elevation', minWidth: 60 },
  { id: 'total-laps', label: 'Total Laps', minWidth: 40 },
  { id: 'laps-completed', label: 'Laps Completed', minWidth: 70 },
  { id: 'laps-to-go', label: 'Laps To Go', minWidth: 40 },
  { id: 'best-lap', label: 'Best Lap', minWidth: 40 },
  { id: 'time-elapsed', label: 'Time Elapsed', minWidth: 60 },
]

// const medColumns = [
//   { id: 'teamName', label: 'Team', minWidth: 200 },
//   { id: 'mountain', label: 'Mountain', minWidth: 115 },
//   { id: 'elevation', label: 'Elevation', minWidth: 60 },
//   { id: 'current-elevation', label: 'Current Elevation', minWidth: 60 },
//   { id: 'total-laps', label: 'Total Laps', minWidth: 40 },
//   { id: 'laps-completed', label: 'Laps Completed', minWidth: 70 },
//   { id: 'laps-to-go', label: 'Laps To Go', minWidth: 40 },
//   { id: 'best-lap', label: 'Best Lap', minWidth: 40 },
//   { id: 'time-elapsed', label: 'Time Elapsed', minWidth: 60 },
// ]

const ProgressBoard = () => {
  // State to store current search input string
  const [searchString, setsearchString] = useState('')
  
  // State for rows filtered by the search input
  const [filteredRows, setFilteredRows] = useState(mockData)

  // Update filteredRows whenever searchString changes
  useEffect(() => {
    const getParticipants = async () => {
      const participants = await fetchParticipants();
      console.log("🚀 ~ getParticipants ~ participants:", participants)
    }
    getParticipants();
    const filtered = mockData.filter((row) =>
      // Filter the data by checking if any cell value contains the search string
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchString.toLowerCase())
      )
    )
    setFilteredRows(filtered)
  }, [searchString])

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '95vw',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: '1rem' }}>
        <a href='https://www.climbingforchange.ca/' target='_blank' rel="noreferrer">
          <img
            src={C4CHorizontalGreenLogo}
            alt='Climbing for Change Logo'
            style={{ maxWidth: '15.5rem', width: 'auto' }}
          />
        </a>
      </Box>

      <Box sx={{ mb: '1rem', maxWidth: '25vw' }}>
        <ProgressSearch searchString={searchString} onChange={setsearchString}/>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <ProgressTable columns={fullColumns} rows={filteredRows} />
      </Box>
    </Container>
  )
}

export default ProgressBoard
