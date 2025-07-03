import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

import SearchBar from '../../../components/admin/forms/fields/SearchBar'
import ParticipantTable from '../../../components/admin/forms/participantforms/ParticipantTable'
import AddParticipantModal from '../../../components/admin/modals/ParticipantModal'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllParticipants } from '../../../services/participantService'

const ParticipantManager = () => {
  const [participants, setParticipants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)
  const [teams, setTeams] = useState([])

  const displayAlert = useAlert()

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getAllParticipants()
        setParticipants(data)
      } catch (error) {
        console.error('Error fetching participants:', error)
      }
    }

    const fetchTeams = async () => {
      try {
        const data = await getAllTeams()
        console.log('Fetched teams:', data)
        setTeams(data)
      } catch (error) {
        console.error('Error fetching teams', error)
      }
    }

    fetchParticipants()
    fetchTeams()
  }, [])

  const handleAddParticipant = (participantData) => {
    const selectedTeam = teams.find((team) => team.id === participantData.teamId)
    console.log('Assigned team:', selectedTeam)

    const newParticipant = {
      firstName: participantData.firstName,
      lastName: participantData.lastName,
      team: selectedTeam || null,  // full team object stored here
    }

    setParticipants([...participants, newParticipant])
    setPopupOpen(false)
    displayAlert('Saved', 'Saved participant to the backend.', 'success')
  }


  return (
    <div>
      <h1
        style={{
          fontFamily: 'Gibson, sans-serif',
          textTransform: 'uppercase',
          color: '#CDDC29',
          letterSpacing: '0.05em'
        }}
      >
        Participants
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#c9d82c',
            color: 'black',
            '&:hover': { backgroundColor: '#b3c623' }
          }}
          onClick={() => setPopupOpen(true)}
        >
          Add Participant
        </Button>
      </div>

      <ParticipantTable searchTerm={searchTerm} participant={participants} />

      <AddParticipantModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={handleAddParticipant}
        teamNames={teams}
      />
    </div>
  )
}

export default ParticipantManager
