import HikingIcon from '@mui/icons-material/Hiking'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog.jsx'
import HillModal from '../../../components/admin/modals/HillModal.jsx'
import DataTable from '../../../components/admin/tables/DataTable.jsx'
import { useAlert } from '../../../hooks/useAlert.js'
import {
  addNewHill,
  deleteHill,
  editHill,
  getAllHills,
} from '../../../services/hillService.js'
import { getAllLocations } from '../../../services/locationService.js'

const fullColumns = [
  { id: 'name', label: 'Hill Name', width: '50%', align: 'left' },
  { id: 'lapDistance', label: 'Lap Distance', width: '15%', align: 'center' },
  { id: 'distanceUnit', label: 'Distance Unit', width: '10%', align: 'center' },
  { id: 'lapElevationGain', label: 'Elevation Gain', width: '15%', align: 'center' },
  { id: 'elevationUnit', label: 'Elevation Unit', width: '10%', align: 'center' },
]

const HillManager = () => {
  const [hills, setHills] = useState([])
  const [currentHill, setCurrentHill] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deletedHill, setDeletedHill] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState([])

  const displayAlert = useAlert()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const hillList = await getAllHills()
        setHills(hillList)
        const locationList = await getAllLocations() 
        setLocations(locationList)
        displayAlert(
          'Hills Loaded',
          `Loaded ${hillList.length} hills from the backend.`,
          'success'
        )
      } catch (error) {
        displayAlert(
          'Error',
          `Failed to Load Hills: ${error.message}`,
          'error'
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [displayAlert])

  const onAdd = () => {
    if (loading) return
    setCurrentHill(null)
    setPopupOpen(true)
  }

  const onEdit = (hill) => {
    if (loading) return
    setCurrentHill(hill)
    setPopupOpen(true)
  }

  const onDelete = (hill) => {
    if (loading) return
    document.activeElement?.blur()
    setDeletedHill(hill)
    setDeleteConfirmOpen(true)
  }

  const confirmedDelete = async () => {
    setLoading(true)
    try {
      await deleteHill(deletedHill.id)
      const newHillList = await getAllHills()
      setHills(newHillList)
      setDeleteConfirmOpen(false)
      displayAlert(
        'Hill Deleted',
        `Deleted ${deletedHill.name} hill.`,
        'success'
      )
    } catch (error) {
      displayAlert(
        'Error',
        `Failed to delete ${deletedHill.name}: ${error.message}`,
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setDeletedHill(null)
  }

  const handleSave = async (hillData) => {
    if (!hillData) return
    setLoading(true)
    try {
      if (hillData.id) {
        await editHill(hillData.id, hillData)
        displayAlert('Edited Hill', `Edited ${hillData.name} hill.`, 'success')
      } else {
        await addNewHill(hillData)
        displayAlert('New Hill Added', `Added ${hillData.name} hill.`, 'success')
      }
      const newHillList = await getAllHills()
      setHills(newHillList)
      setPopupOpen(false)
    } catch (error) {
      displayAlert('Error', `Failed to save hill: ${error.message}`, 'error')
    } finally {
      setLoading(false)
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
        tableTitle='Hills'
        tableIcon={HikingIcon}
        tableColumns={fullColumns}
        tableData={hills.map((hill) => ({
          ...hill,
          active: true,
        }))}
        showInactive={true}
        setShowInactive={() => {}}
        eventsForDropdown={[]}
        selectedEvent={null}
        setSelectedEvent={() => {}}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
      />

      <HillModal
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false)
          setCurrentHill(null)
        }}
        onSave={handleSave}
        hillData={currentHill}
        onLocation={locations}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={confirmedDelete}
      />
    </Box>
  )
}

export default HillManager