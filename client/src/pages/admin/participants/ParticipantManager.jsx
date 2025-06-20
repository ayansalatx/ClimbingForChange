import SearchBar from "../../../components/admin/forms/fields/SearchBar"
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import { getAllParticipants } from "../../../services/participantService"

import ParticipantTable from '../../../components/admin/forms/participantforms/ParticipantTable'

const ParticipantManager = () => {
  const [participants, setParticipants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [popupOpen, setPopupOpen] = useState(false)

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

  useEffect(() => {
    console.log(participants)
  }, [participants])
  
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

    </div>

    
    )
}

export default ParticipantManager
