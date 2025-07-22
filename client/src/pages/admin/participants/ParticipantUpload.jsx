import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ConfirmDeleteDialog from '../../../components/admin/modals/ConfirmDeleteDialog'
import { useAlert } from '../../../hooks/useAlert'
import { getActiveUpcomingEvents } from '../../../services/eventService'
import { getAllHills } from '../../../services/hillService'
import { uploadCSV } from '../../../services/uploadcsv'
import theme from '../../../styles/theme'

const ParticipantUpload = () => {
  const [rows, setRows] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [events, setEvents] = useState([])
  const [hills, setHills] = useState([])
  const [selectedEventId, setSelectedEventId] = useState('')
  const [selectedHillId, setSelectedHillId] = useState('')
  const [overwrite, setOverwrite] = useState(false)
  const [eventError, setEventError] = useState(false)
  const [hillError, setHillError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmOpen, setOverwriteConfirmOpen] = useState(false)

  const displayAlert = useAlert()

  const navigate = useNavigate()

  useEffect(() => {
    const loadEventsHills = async () => {
      const eventsList = await getActiveUpcomingEvents()
      const hillsList = await getAllHills()

      setEvents(eventsList)
      setHills(hillsList)
    }

    loadEventsHills()
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
        header: true, // first row → keys
        worker: true, // parse in a Web Worker
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
          displayAlert(
            'Loading Error',
            `Error while loading file ${err.message}.`,
            'error'
          )
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
      await uploadCSV(formData, selectedEventId, selectedHillId, overwrite)
      setIsLoading(false)
      displayAlert(
        'Uploaded',
        `Successfully uploaded ${selectedFile.name}.`,
        'success'
      )
      setRows([])
      setSelectedFile(selectedFile)
      navigate('/admin/participants')
    } catch (error) {
      setIsLoading(false)
      displayAlert('Error', `Upload fail ${error.message}.`, 'error')
    }
  }

  const cancelDelete = () => {
    setOverwriteConfirmOpen(false)
    setOverwrite(false)
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
        pt: 3,
        pb: '4rem',
        px: '1.5rem',
      }}
    >
      <Box
        sx={{
          elevation: 3,
          border: `4px solid ${theme.palette.info.main}`,
          borderRadius: '5px',
          height: '100%',
          width: '60%',
          minWidth: '375px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: alpha(theme.palette.primary.light, 0.035),
        }}
      >
        {/* Title */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '.5rem 0',
            backgroundColor: 'info.main',
            color: 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <CloudUploadIcon
              sx={{ mt: 0.25, fontSize: '2.5rem', color: 'primary.main' }}
            />
            <Typography
              variant="h3"
              textTransform="uppercase"
              fontWeight="bold"
              sx={{ fontSize: '2.5rem' }}
            >
              Participant & Team Upload
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: 0,
            flexGrow: 1,
            gap: 1,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '60%',
                  }}
                >
                  <FormControl error={eventError} sx={{ width: '100%' }}>
                    <Select
                      size="small"
                      variant="outlined"
                      id="event-select"
                      value={selectedEventId}
                      onChange={(event) => {
                        setEventError(false)
                        setSelectedEventId(event.target.value)
                      }}
                      displayEmpty
                      required
                      sx={{
                        textAlign: 'left',
                        borderRadius: '3px',
                        border: `2px solid ${theme.palette.primary.main}`,
                        color: 'primary.light',
                        fontSize: '1rem',
                        '&:before, &:after': {
                          borderBottom: 'none !important',
                        },
                        '& .MuiSelect-select': {
                          opacity: '100%',
                          backgroundColor: 'background.paper',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '.01rem',
                          border: 'none',
                        },
                        '& .MuiSelect-select:hover': {
                          background: alpha(theme.palette.primary.light, 0.1),
                          border: 'none',
                        },
                        '.MuiSvgIcon-root': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        disabled
                        sx={{
                          minHeight: { xxs: 'unset' },
                          fontSize: '1.25rem',
                          py: 0,
                          color: 'primary.light',
                        }}
                      >
                        Select an Event
                      </MenuItem>
                      {events.map((event) => (
                        <MenuItem
                          value={event.id}
                          key={event.id}
                          sx={{
                            fontSize: '1.25rem',
                            minHeight: { xxs: 'unset', xs: 'unset', sm: 0 },
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: alpha(
                                theme.palette.secondary.main,
                                0.7
                              ),
                            },
                            '&:focus': {
                              background: alpha(
                                theme.palette.primary.light,
                                0.1
                              ),
                            },
                          }}
                        >
                          {event.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl error={hillError} sx={{ width: '100%' }}>
                    <Select
                      size="small"
                      variant="outlined"
                      id="hill-select"
                      value={selectedHillId}
                      onChange={(event) => {
                        setHillError(false)
                        setSelectedHillId(event.target.value)
                      }}
                      displayEmpty
                      required
                      sx={{
                        textAlign: 'left',
                        borderRadius: '3px',
                        border: `2px solid ${theme.palette.primary.main}`,
                        color: 'primary.light',
                        fontSize: '1rem',
                        '&:before, &:after': {
                          borderBottom: 'none !important',
                        },
                        '& .MuiSelect-select': {
                          opacity: '100%',
                          backgroundColor: 'background.paper',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '.01rem',
                          border: 'none',
                        },
                        '& .MuiSelect-select:hover': {
                          background: alpha(theme.palette.primary.light, 0.1),
                          border: 'none',
                        },
                        '.MuiSvgIcon-root': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        disabled
                        sx={{
                          minHeight: { xxs: 'unset' },
                          fontSize: '1.25rem',
                          py: 0,
                          color: 'primary.light',
                        }}
                      >
                        Select a hill
                      </MenuItem>
                      {hills.map((hill) => (
                        <MenuItem
                          value={hill.id}
                          key={hill.id}
                          sx={{
                            fontSize: '1.25rem',
                            minHeight: { xxs: 'unset', xs: 'unset', sm: 0 },
                            color: 'primary.main',
                            '&:hover': {
                              backgroundColor: alpha(
                                theme.palette.secondary.main,
                                0.7
                              ),
                            },
                            '&:focus': {
                              background: alpha(
                                theme.palette.primary.light,
                                0.1
                              ),
                            },
                          }}
                        >
                          {hill.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '40%',
                    justifyContent: 'center',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      disabled={!selectedEventId}
                      sx={{ color: 'primary.main' }}
                      control={
                        <Checkbox
                          value={overwrite}
                          onChange={(event) => {
                            setOverwrite(event.target.checked)
                          }}
                          sx={{ color: 'primary.main', borderRadius: '4px' }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            color: selectedEventId ? 'primary.main' : 'gray.main',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            letterSpacing: '.01rem',
                          }}
                        >
                          Overwrite
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    disabled={!selectedEventId}
                  >
                    Select CSV File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          {rows.length > 0 ? (
            <Box sx={{ flexGrow: 1, minHeight: 0, width: '100%' }}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: '100%', overflowY: 'auto' }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        '& th': {
                          backgroundColor: 'primary.light', // MUI blue
                          color: 'background.paper', // white text
                        },
                      }}
                    >
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
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
              </TableContainer>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                minHeight: 0,
                width: '100%',
                alignContent: 'center',
                borderRadius: '5px',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h6" sx={{ color: 'gray.main' }}>
                Please select {selectedEventId ? 'a CSV file' : 'an Event'}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                display: 'flex',
                gap: '0.25rem',
                backgroundColor: 'background.paper',
              }}
              disabled={rows.length === 0 || !selectedEventId || !selectedHillId || isLoading}
              loading={isLoading}
              onClick={() => {
                if (!selectedEventId || !selectedEventId) {
                  setEventError(!selectedEventId)
                  setHillError(!selectedHillId)
                } else {
                  setEventError(false)
                  setHillError(false)

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
        </Box>
      </Box>
      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        onCancel={cancelDelete}
        onConfirm={handleUpload}
      />
    </Box>
  )
}

export default ParticipantUpload
