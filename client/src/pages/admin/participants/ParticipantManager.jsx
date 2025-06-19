import SearchBar from "../../../components/admin/forms/fields/SearchBar"
import Button from '@mui/material/Button'
import { useState } from 'react'


const ParticipantManager = () => {


  const [popupOpen, setPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  return (

    <div>
      <h1 style={{ fontFamily: 'Gibson, sans-serif', textTransform: 'uppercase', color: '#CDDC29', letterSpacing: '0.05em' }}>Participants</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#c9d82c', color: 'black', '&:hover': { backgroundColor: '#b3c623' } }}
          // onClick={() => setPopupOpen(true)}
        >Add Location</Button>
      </div>

      <h1>Table</h1>


    </div>

    
    )
}

export default ParticipantManager
