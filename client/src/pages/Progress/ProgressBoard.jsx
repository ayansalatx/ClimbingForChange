import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

import C4CHorizontalGreenLogo from '../../assets/C4C-branding/Climbing-For-Change-Full-Horizontal_Green.png'
import ProgressSearch from '../../components/progress/ProgressSearch'
import ProgressTable from '../../components/progress/ProgressTable'
import { getAllMountains } from '../../services/mountainService'
import { getAllParticipants } from '../../services/participantService'
import { getAllTeams } from '../../services/teamService'

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
        const [teamList, participantList, mountainList] = await Promise.all([
          getAllTeams(),
          getAllParticipants(),
          getAllMountains(),
        ])

        // Build participant map grouped by team id
        const participantMap = {}
        participantList.map(async (participant) => {
          const teamId = participant.teamId?.id || participant.teamId

          if (!participantMap[teamId]) participantMap[teamId] = []
          participantMap[teamId].push(participant)
        })

        // Map mountains by ID
        const mountainMap = {}
        mountainList.forEach((mountain) => {
          mountainMap[mountain.id] = mountain
        })

        // Create array in team for participants
        const teamsFullyLoaded = await Promise.all(
          teamList.map((team) => {
            const mountainId = team.targetMountainId
            let mountain = null

            if (mountainId) {
              try {
                mountain = mountainMap[team.targetMountainId]
              } catch (err) {
                console.error(
                  `Error fetching mountain for team ${team.id}`,
                  err
                )
              }
            }

            return {
              ...team,
              participants: participantMap[team._id] || [],
              mountainName: mountain?.name || '',
              elevation: mountain?.totalElevation || 0,
            }
          })
        )

        setTeams(teamsFullyLoaded)
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
  }, [searchString, teams])

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
          teamNames={[...new Set(teams.map((team) => team.name))]}
        />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden' }}>
        <ProgressTable columns={fullColumns} teams={filteredTeams} />
      </Box>
    </Container>
  )
}

export default ProgressBoard
