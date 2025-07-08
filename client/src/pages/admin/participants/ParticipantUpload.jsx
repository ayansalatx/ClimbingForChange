import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog'
import { useAlert } from '../../../hooks/useAlert'
import { getAllEvents } from '../../../services/eventService'
import { uploadCSV } from '../../../services/uploadcsv'

const ParticipantUpload = () => {
  const theme = useTheme()
  const [rows, setRows] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [allEvent, setAllEvent] = useState()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [overwrite, setOverwrite] = useState(false)
  const [eventError, setEventError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmOpen, setOverwriteConfirmOpen] = useState(false)

  const displayAlert = useAlert()

  const navigate = useNavigate()

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getAllEvents()
      setAllEvent(events)
    }

    loadEvents()

  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    const headerMap = {
      'Participant ID': 'participantId',
      'First Name': 'firstName',
      'Last Name': 'lastName',
      'Sub-event': 'subEvent',
      'Team Name': 'teamName',
    }

    if (file.type === 'text/csv') {
      Papa.parse(file, {
        header: true,         // first row → keys
        worker: true,         // parse in a Web Worker
        skipEmptyLines: true,
        complete: (results) => {
          const rowsWithRenamedHeaders = results.data.map((row) => {
            const newRow = {}
            for (const key in row) {
              const newKey = headerMap[key] || key
              newRow[newKey] = row[key]
            }
            return newRow
          })

          setSelectedFile(file)
          setRows(rowsWithRenamedHeaders)
          event.target.value = ''
        },
        error: (err) => {
          console.error(err)
          displayAlert('Loading Error', `Error while loading file ${err.message}.`, 'error')
        },
      })
    } else {
      displayAlert('Loading Error', 'Not a csv file.', 'error')
      event.target.value = ''
      return
    }
  }

  const handleUpload = async () => {
    setOverwriteConfirmOpen(false)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      setIsLoading(true)
      await uploadCSV(formData, selectedEvent.id, overwrite)
      setIsLoading(false)
      displayAlert('Uploaded', `Successfully uploaded ${selectedFile.name}.`, 'success')
      setRows([])
      setSelectedFile(selectedFile)
      navigate('/admin/participants')
    } catch (error) {
      displayAlert('Error', `Upload fail ${error.message}.`, 'error')
    }
  }

  const cancelDelete = () => {
    setOverwriteConfirmOpen(false)
    setOverwrite(false)
  }

  return (
    <div style={{
      position: 'relative',
      width: '95vw',
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Box sx={{
        border: `2px solid ${theme.palette.primary['main']}`,
        mt: '5rem',
        width: '70%',
        borderRadius: '5px',
      }}>
        <Box sx={{
          backgroundColor: theme.palette.primary['light'],
          padding: '1.5rem 0',
          color: '#fff',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
            <CloudUploadIcon fontSize='large' />
            <Typography variant='h4'>Participants Upload</Typography>
          </Box>
        </Box>

        <Box sx={{ padding: '1rem', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" component="label">
              Upload CSV File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>


            <Button
              variant='outlined'
              sx={{ display: 'flex', gap: '0.25rem' }}
              disabled={rows.length === 0 ? true : false}
              loading={isLoading}
              onClick={() => {
                if (!selectedEvent) {
                  setEventError(true)
                } else {
                  setEventError(false)

                  if (overwrite) {
                    setOverwriteConfirmOpen(true)
                  } else {
                    handleUpload()
                  }
                }
              }}
            >
              <CloudUploadIcon /> Upload
            </Button>
          </Box>
          <Box sx={{ display: 'flex', py: '1rem' }}>
            <FormControl sx={{ minWidth: '15rem' }} size="small" error={eventError}>
              <InputLabel id="select-event-label">Select Event</InputLabel>
              <Select
                labelId="select-event-label"
                id="demo-select-small"
                value={selectedEvent || ''}
                label="Select Event"
                onChange={(event) => {
                  setEventError(false)
                  setSelectedEvent(event.target.value)
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allEvent && allEvent.map(e => {
                  return <MenuItem key={e.id} value={e}>{e.name}</MenuItem>
                })}
              </Select>
              {eventError && <FormHelperText>You must select an event</FormHelperText>}
            </FormControl>
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel control={<Checkbox value={overwrite} onChange={(event) => { setOverwrite(event.target.checked) }} />} label="Overwrite existing list" />
            </FormGroup>
          </Box>

          {rows.length > 0 ? <TableContainer component={Paper} sx={{ margin: '1rem 0', height: '60%', overflowY: 'scroll' }}>
            <Table sx={{ minWidth: 650 }} stickyHeader>
              <TableHead>
                <TableRow sx={{
                  '& th': {
                    backgroundColor: theme.palette.primary['light'], // MUI blue
                    color: '#fff',              // white text
                  },
                }}>
                  <TableCell>Participant ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Sub Event</TableCell>
                  <TableCell>Team Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.participantId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.participantId}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.subEvent}</TableCell>
                    <TableCell>{row.teamName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> : <Typography variant='h5' mt='5rem'>Please select CSV to view data.</Typography>}

        </Box>
      </Box>
      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleUpload}
      />
    </div>
  )
}

export default ParticipantUpload
