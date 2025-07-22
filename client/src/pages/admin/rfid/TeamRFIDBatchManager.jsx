import EditIcon from '@mui/icons-material/Edit'
import RfidIcon from '@mui/icons-material/Nfc'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import DataTable from '../../../components/admin/tables/rfidbatch/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import { getRfidTags, updateRfidTag } from '../../../services/rfidService.js'
import { getTeamsByEvent } from '../../../services/teamService.js'

const fullColumns = [
  { id: 'name', label: 'Team Name', width: '75%', align: 'left' },
  { id: 'rfidTag', label: 'RFID', width: '25%', align: 'center' },
]

const CombinedRfidEditIcon = (props) => (
  <Box position="relative" width={40} height={40} {...props}>
    <RfidIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: 30 }} />
    <EditIcon sx={{ position: 'absolute', bottom: -2, right: -2, fontSize: 30 }} />
  </Box>
)

const TeamRFIDBatchManager = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [rfidTags, setrfidTags] = useState([])

  const displayAlert = useAlert()

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
        const eventsList = await getAllEvents()
        setEvents(eventsList)
        displayAlert('Success', 'Successfully loaded event data.', 'success')
      } catch (error) {
        displayAlert('Error', `Failed to load events: ${error.message}`, 'error')
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [displayAlert])

  useEffect(() => {
    if (!selectedEvent) {
      setTeams([])
      return
    }

    const loadTeamsAndRfid = async () => {
      setLoading(true)
      try {
        const filteredTeams = await getTeamsByEvent(selectedEvent)
        setTeams(filteredTeams)

        const tags = await getRfidTags()
        const formattedTags = tags.map((tag) => ({
          id: tag.id,
          label: tag.serialNumber || tag.label || tag.id || '',
        }))
        setrfidTags(formattedTags)

        displayAlert(
          'Data Loaded',
          `Loaded ${filteredTeams.length} teams and ${formattedTags.length} RFID tags.`,
          'success'
        )
      } catch (error) {
        displayAlert('Error', `Failed to load teams or RFID tags: ${error.message}`, 'error')
      } finally {
        setLoading(false)
      }
    }

    loadTeamsAndRfid()
  }, [selectedEvent, displayAlert])

  const tableData = teams.map((team) => ({
    id: team.id,
    name: team.name,
    rfidTag: typeof team.rfidTag === 'object' ? team.rfidTag.id : team.rfidTag || '',
    active: true,
  }))

  const handleRfidChange = async (teamId, newRfidId) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, rfidTag: newRfidId } : team
      )
    )
  
    try {
      await updateRfidTag(teamId, newRfidId)
      displayAlert('Success', 'RFID tag updated successfully', 'success')
    } catch (error) {
      displayAlert('Error', `Failed to update RFID tag: ${error.message}`, 'error')
    }
  }
  const usedRfidIds = []
  for (const row of tableData) {
    if (row.rfidTag && row.rfidTag !== '') {
      usedRfidIds.push(row.rfidTag)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '4rem',
        px: '1.5rem',
      }}
    >
      <DataTable
        tableTitle="Team RFID Batch Edit"
        tableIcon={CombinedRfidEditIcon}
        tableColumns={fullColumns}
        tableData={tableData}
        eventsForDropdown={events}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        loading={loading}
        rfidTags={rfidTags}
        onRfidChange={handleRfidChange}
        usedRfidIds={usedRfidIds}
      />
    </Box>
  )
}

export default TeamRFIDBatchManager
