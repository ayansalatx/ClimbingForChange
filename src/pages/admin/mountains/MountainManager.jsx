import TerrainIcon from '@mui/icons-material/Terrain'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog'
import MountainModal from '../../../components/admin/modals/MountainModal'
import DataTable from '../../../components/admin/tables/DataTable'
import { useAlert } from '../../../hooks/useAlert'
import {
  createMountain,
  deleteMountain,
  getAllMountains,
  updateMountain,
} from '../../../services/mountainService'

const fullColumns = [
  {
    id: 'name',
    label: 'Mountain Name',
    width: '40%',
    align: 'left',
    format: (value) => value || 'Unnamed Mountain',
  },
  {
    id: 'totalElevation',
    label: 'Elevation',
    width: '30%',
    align: 'center',
    format: (value) => (value ? value.toString() : '0'),
  },
  {
    id: 'elevationUnit',
    label: 'Unit',
    width: '30%',
    align: 'center',
    format: (value) => value || 'FT',
  },
]

const MountainManager = () => {
  const [loading, setLoading] = useState(true)
  const [mountains, setMountains] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [mountainToDelete, setMountainToDelete] = useState(null)
  const [editedMountain, setEditedMountain] = useState(null)
  const [highlightedMountainId, setHighlightedMountainId] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [searchParams] = useSearchParams()
  const displayAlert = useAlert()
  const loadData = useCallback(async () => {
    try {
      const mountainsList = await getAllMountains()

      const mountainsWithIds = mountainsList.map((mountain) => {
        // Ensure all required fields have default values
        const processedMountain = {
          id: mountain._id || mountain.id,
          name: mountain.name || 'Unnamed Mountain',
          totalElevation: mountain.totalElevation?.toString() || '0',
          elevationUnit: mountain.elevationUnit || 'FT',
          active: mountain.active !== undefined ? mountain.active : true,
          isHighlighted: (mountain._id || mountain.id) === highlightedMountainId,
          ...mountain, // Spread the rest of the properties
        }

        return processedMountain
      })
      setMountains(mountainsWithIds)
    }
    catch (error) {
      displayAlert(
        'Error',
        `Failed to Load Mountains: ${error.message}`,
        'error'
      )
    }
    finally {
      setLoading(false)
    }
  }, [displayAlert, highlightedMountainId])
  useEffect(() => {
    loadData()
  }, [loadData])

  // Handle pagination for highlighted mountains
  useEffect(() => {
    if (highlightedMountainId && mountains.length > 0) {
      const highlightedIndex = mountains.findIndex((mountain) => mountain.id === highlightedMountainId)
      if (highlightedIndex !== -1) {
        const correctPage = Math.floor(highlightedIndex / rowsPerPage)
        setPage(correctPage)
      }
    }
  }, [highlightedMountainId, mountains, rowsPerPage])

  useEffect(() => {
    // Check URL parameters for mountain highlighting
    const mountainParam = searchParams.get('mountain')
    if (mountainParam) {
      setHighlightedMountainId(mountainParam)
      // Clear highlight after 5 seconds
      setTimeout(() => {
        setHighlightedMountainId(null)
      }, 2000)
    }
  }, [displayAlert, searchParams])

  const onAdd = () => {
    setEditedMountain({
      name: '',
      totalElevation: '0',
      elevationUnit: 'FT',
      active: true,
    })
    setPopupOpen(true)
  }

  const onEdit = (mountain) => {
    setEditedMountain({
      ...mountain,
      name: mountain.name || '',
      totalElevation: mountain.totalElevation?.toString() || '0',
      elevationUnit: mountain.elevationUnit || 'FT',
      active: mountain.active !== undefined ? mountain.active : true,
    })
    setPopupOpen(true)
  }

  const onDelete = (mountain) => {
    setMountainToDelete(mountain)
    setDeleteConfirmOpen(true)
  }

  const confirmedDelete = async () => {
    if (!mountainToDelete) {
      return
    }

    try {
      await deleteMountain(mountainToDelete.id)

      // Update the UI by removing the deleted mountain
      setMountains((prev) => prev.filter((m) => m.id !== mountainToDelete.id))

      displayAlert(
        'Success',
        `Mountain '${mountainToDelete.name}' has been deleted.`,
        'success'
      )
    }
    catch (error) {
      displayAlert(
        'Error',
        error.response?.data?.message
        || `Failed to delete mountain: ${error.message}`,
        'error'
      )
    }
    finally {
      setDeleteConfirmOpen(false)
      setMountainToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setMountainToDelete(null)
  }

  const handleSave = async (mountainData) => {
    try {
      let savedMountain

      // Check if we're updating an existing mountain
      if (editedMountain && editedMountain.id) {
        // Update existing mountain
        savedMountain = await updateMountain(editedMountain.id, mountainData)

        setMountains((prev) =>
          prev.map((mountain) =>
            mountain.id === editedMountain.id
              ? { ...savedMountain, id: savedMountain._id || savedMountain.id }
              : mountain
          )
        )

        displayAlert(
          'Success',
          `Mountain '${editedMountain.name}' has been updated.`,
          'success'
        )
        loadData()
      }
      else {
        const { ...newMountainData } = mountainData
        savedMountain = await createMountain(newMountainData)

        setMountains((prev) => [
          ...prev,
          {
            ...savedMountain,
            id: savedMountain._id || savedMountain.id,
          },
        ])

        displayAlert(
          'Success',
          `Mountain '${savedMountain.name}' has been created.`,
          'success'
        )
        loadData()
      }

      setPopupOpen(false)
      setEditedMountain(null)
    }
    catch (error) {
      displayAlert(
        'Error',
        error.response?.data?.message || 'Failed to save mountain',
        'error'
      )
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
        tableTitle="Mountains"
        tableIcon={TerrainIcon}
        tableColumns={fullColumns}
        tableData={mountains}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        eventsForDropdown=""
        selectedEvent=""
        setSelectedEvent=""
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
        loading={loading}
        externalPage={page}
        externalSetPage={setPage}
        externalRowsPerPage={rowsPerPage}
        externalSetRowsPerPage={setRowsPerPage}
      />

      <MountainModal
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false)
          setEditedMountain(null)
        }}
        onSave={handleSave}
        mountain={editedMountain}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={confirmedDelete}
      />
    </Box>
  )
}

export default MountainManager
