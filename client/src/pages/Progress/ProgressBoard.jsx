import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import ProgressSearch from '../../components/progress/ProgressSearch'
import ProgressTable from '../../components/progress/ProgressTable'
import { getAllTeams } from '../../services/teamService'
import { getAllParticipants, getParticipantsByTeam } from '../../services/participantService'
import { getMountainById } from '../../services/mountainService'

// Define columns for full width screen
const fullColumns = [
  { id: 'name', label: 'Team', minWidth: 200 },
  { id: 'mountainName', label: 'Mountain', minWidth: 115 },
  { id: 'elevation', label: 'Elevation', minWidth: 60 },
  { id: 'currentElevation', label: 'Current Elevation', minWidth: 60 },
  { id: 'lapsRequired', label: 'Total Laps', minWidth: 40 },
  { id: 'lapsCompleted', label: 'Laps Completed', minWidth: 70 },
  { id: 'lapsToGo', label: 'Laps To Go', minWidth: 40 },
  { id: 'bestLap', label: 'Best Lap', minWidth: 40 },
  { id: 'timeElapsed', label: 'Time Elapsed', minWidth: 60 },
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
  // State for teams
  const [teams, setTeams] = useState([])
  // State to store current search input string
  const [searchString, setsearchString] = useState('')
  // State for teams filtered by the search input
  const [filteredTeams, setFilteredTeams] = useState([])

  // Load Participant data from server
  useEffect(() => {
    async function loadData() {
      try {
        const teamList = await getAllTeams()
        const participantList = await getAllParticipants()
        // const teamId = '6849a981d4f16de000528a41'
        // const participantsByTeam = await getParticipantsByTeam(teamId)
        // const mountainId = '6849a980d4f16de0005289fd'
        // const mountainById = await getMountainById(mountainId)
        // console.log(participantsByTeam)
        // console.log(mountainById)

        // Group participants by ID
        const participantMap = {}
        participantList.forEach((participant) => {
          const teamId = participant.teamId?._id || participant.teamId
          if (!participantMap[teamId]) participantMap[teamId] = []
          participantMap[teamId].push(participant)
        })

        // Create array in team for participants
        const teamsWithParticipants = teamList.map((team) => ({
          ...team,
          participants: participantMap[team._id] || [],
        }))

        setTeams(teamsWithParticipants)
      } catch (e) {
        console.log('Failed to load progress data', e)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!searchString) {
      setFilteredTeams(teams)
      return
    }
    const filteredTeams = teams.filter((team) => {
      const search = searchString.toLowerCase()

      const teamMatch = team.name.toLowerCase().includes(search)

      const participantMatch = team.participants.some((participant) => {
        return (
          participant.firstName.toLowerCase().includes(search) ||
          participant.lastName.toLowerCase().includes(search)
        )
      })

      return teamMatch || participantMatch
    })
    setFilteredTeams(filteredTeams)
  }, [searchString, teams.length])

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
        <a
          href="https://www.climbingforchange.ca/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={C4CHorizontalGreenLogo}
            alt="Climbing for Change Logo"
            style={{ maxWidth: '15.5rem', width: 'auto' }}
          />
        </a>
      </Box>

      <Box sx={{ mb: '1rem', maxWidth: '25vw' }}>
        <ProgressSearch
          searchString={searchString}
          onChange={setsearchString}
        />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <ProgressTable columns={fullColumns} teams={filteredTeams} />
      </Box>
    </Container>
  )
}

export default ProgressBoard
