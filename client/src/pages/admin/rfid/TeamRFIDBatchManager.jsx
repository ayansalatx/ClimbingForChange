import EditIcon from '@mui/icons-material/Edit'
import RfidIcon from '@mui/icons-material/Nfc'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmSaveDialog from '../../../components/admin/modals/ConfirmSaveDialog.jsx'
import DataTable from '../../../components/admin/tables/rfidbatch/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import { getAllEvents } from '../../../services/eventService.js'
import { getRfidTags } from '../../../services/rfidService.js'
import { editTeam, getTeamById, getTeamsByEvent } from '../../../services/teamService.js'

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
  const [updatedRfids, setUpdatedRfids] = useState({})
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false)

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
          label: tag.serialNumber || '',
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
    rfidTag: team.rfidTag && typeof team.rfidTag === 'object' ? team.rfidTag.id : team.rfidTag || '',
    active: true,
    isEdited: Object.prototype.hasOwnProperty.call(updatedRfids, team.id),
  }))

  const handleRfidChange = (teamId, newRfidId) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, rfidTag: newRfidId } : team
      )
    )

    setUpdatedRfids((prev) => ({
      ...prev,
      [teamId]: newRfidId,
    }))
  }

  const confirmSaveChanges = async () => {
    const entries = Object.entries(updatedRfids)
    if (entries.length === 0) {
      setConfirmSaveOpen(false)
      return
    }

    let successCount = 0
    let failureCount = 0

    for (const [teamId, newRfidId] of entries) {
      try {
        const existingTeam = await getTeamById(teamId)

        const updatedTeamData = {
          ...existingTeam,
          rfidTag: newRfidId || null,
        }

        await editTeam(teamId, updatedTeamData)
        successCount++
      } catch (error) {
        failureCount++
        displayAlert(`Failed to update team ${teamId}:`, error)
      }
    }

    if (successCount > 0) {
      displayAlert('Success', `${successCount} RFID tag(s) updated successfully`, 'success')
    }
    if (failureCount > 0) {
      displayAlert('Error', `${failureCount} update(s) failed. See console for details.`, 'error')
    }

    setUpdatedRfids({})
    setConfirmSaveOpen(false)
  }
  const usedRfidIds = tableData
    .filter((row) => row.rfidTag)
    .map((row) => row.rfidTag)

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
        onSave={() => setConfirmSaveOpen(true)}
      />
      <ConfirmSaveDialog
        open={confirmSaveOpen}
        onCancel={() => setConfirmSaveOpen(false)}
        onConfirm={confirmSaveChanges}
      />
    </Box>
  )
}

export default TeamRFIDBatchManager
