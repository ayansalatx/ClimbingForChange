import SearchBar from "../../../components/admin/forms/fields/SearchBar"
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllParticipants } from "../../../services/participantService"

import ParticipantTable from '../../../components/admin/forms/participantforms/ParticipantTable'
import AddParticipantModal from "../../../components/admin/modals/ParticipantModal"

const ParticipantManager = () => {
  const [participants, setParticipants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)

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

    
    fetchParticipants()
  }, [])

  const handleAddParticipant = (eventData) => {
    setParticipants([...participants, eventData])
    setPopupOpen(false)
    displayAlert('Saved', 'Saved participant to the backend.', 'success')
  }
  
  return (


    <div>
      <h1 style={{ fontFamily: 'Gibson, sans-serif', textTransform: 'uppercase', color: '#CDDC29', letterSpacing: '0.05em' }}>Participants</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623' } }}
          onClick={() => setPopupOpen(true)}
        >Add Participant</Button>
      </div>

    <ParticipantTable searchTerm={searchTerm} participant={participants} />

    <AddParticipantModal  
    open={popupOpen} 
    onClose={() => setPopupOpen(false)}
    onAdd={handleAddParticipant}
    />

    </div>

    
    )
}

export default ParticipantManager
