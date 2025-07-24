import RfidIcon from '@mui/icons-material/Nfc'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog'
import RFIDModal from '../../../components/admin/modals/RFIDModal'
import DataTable from '../../../components/admin/tables/DataTable'
import { useAlert } from '../../../hooks/useAlert'
import {
  createRfidTag,
  deleteRfidTag,
  getRfidTags,
  updateRfidTag,
} from '../../../services/rfidService'

const tableColumns = [
  {
    id: 'serialNumber',
    label: 'Serial Number',
    width: '40%',
    align: 'left',
    format: (value) => value || 'N/A',
  },
  {
    id: 'createdAt',
    label: 'Created At',
    width: '30%',
    align: 'center',
    format: (value) => value || 'N/A',
  },
  {
    id: 'updatedAt',
    label: 'Last Updated',
    width: '30%',
    align: 'center',
    format: (value) => value || 'N/A',
  },
]

const RFIDManager = () => {
  const [rfidData, setRfidData] = useState([])
  const [showInactive, setShowInactive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [rfidToDelete, setRfidToDelete] = useState(null)
  const [editingRfid, setEditingRfid] = useState(null)

  const displayAlert = useAlert()

  // Fetch RFID data
  const loadData = useCallback(async () => {
    try {
      const tags = await getRfidTags()
      const processedTags = tags.map((tag) => ({
        id: tag._id || tag.id,
        serialNumber: tag.serialNumber,
        createdAt: new Date(tag.createdAt).toLocaleString(),
        updatedAt: new Date(tag.updatedAt).toLocaleString(),
        active: tag.active !== false, // Handle potential undefined active status
      }))
      setRfidData(processedTags)
    }
    catch (err) {
      const errorMessage
        = err.response?.data?.message || err.message || 'Failed to load RFID tags'
      displayAlert('Error', errorMessage, 'error')
    }
  }, [displayAlert])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSave = async (tagData) => {
    try {
      const tagPayload = {
        serialNumber: tagData.serialNumber.trim(),
      }

      if (editingRfid) {
        await updateRfidTag(editingRfid.id, tagPayload)
        displayAlert('Success', 'RFID tag updated successfully', 'success')
      }
      else {
        await createRfidTag(tagPayload)
        displayAlert('Success', 'RFID tag created successfully', 'success')
      }

      setIsModalOpen(false)
      setEditingRfid(null)
      loadData()
    }
    catch (error) {
      const errorMessage
        = error.response?.data?.message || 'Failed to save RFID tag'
      displayAlert('Error', errorMessage, 'error')
    }
  }

  const onAdd = () => {
    setEditingRfid(null)
    setIsModalOpen(true)
  }

  const onEdit = (rfid) => {
    setEditingRfid(rfid)
    setIsModalOpen(true)
  }

  const onDelete = (rfid) => {
    setRfidToDelete(rfid)
    setDeleteConfirmOpen(true)
  }

  const confirmedDelete = async () => {
    if (!rfidToDelete) return

    try {
      await deleteRfidTag(rfidToDelete.id)
      displayAlert('Success', 'RFID tag deleted successfully', 'success')
      loadData()
    }
    catch (error) {
      displayAlert(
        'Error',
        error.response?.data?.message || 'Failed to delete RFID tag',
        'error'
      )
    }
    finally {
      setDeleteConfirmOpen(false)
      setRfidToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setRfidToDelete(null)
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
        tableTitle="RFID Tags"
        tableIcon={RfidIcon}
        tableColumns={tableColumns}
        tableData={rfidData}
        showInactive={showInactive}
        setShowInactive={setShowInactive}
        eventsForDropdown={[]}
        selectedEvent={null}
        setSelectedEvent={() => {}}
        onAddClick={onAdd}
        onEditClick={onEdit}
        onDeleteClick={onDelete}
      />

      <RFIDModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingRfid(null)
        }}
        onSave={handleSave}
        rfid={editingRfid}
      />

      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={confirmedDelete}
      />
    </Box>
  )
}

export default RFIDManager
