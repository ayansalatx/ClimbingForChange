import { useState } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAlert } from '../../../hooks/useAlert';
import { uploadParticipants } from '../../../services/participantService';

const ParticipantUpload = () => {
    const theme = useTheme()
    const [rows, setRows] = useState([])

    const displayAlert = useAlert()

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const headerMap = {
            'Participant ID': 'participantId',
            'First Name': 'firstName',
            'Last Name': 'lastName',
            'Sub-event': 'subEvent',
            'Team Name': 'teamName',
        };

        if (file.type === 'text/csv') {
            Papa.parse(file, {
                header: true,         // first row → keys
                worker: true,         // parse in a Web Worker
                skipEmptyLines: true,
                complete: (results) => {
                    const rowsWithRenamedHeaders = results.data.map((row) => {
                        const newRow = {};
                        for (const key in row) {
                            const newKey = headerMap[key] || key;
                            newRow[newKey] = row[key];
                        }
                        return newRow;
                    });

                    setRows(rowsWithRenamedHeaders)
                },
                error: (err) => {
                    console.error(err)
                    displayAlert('Loading Error', `Error while loading file ${err.message}.`, 'error')
                }
            });
        } else {
            displayAlert('Loading Error', 'Not a csv file.', 'error')
            return
        }
    };

    const handleUpload = async() => {
        try {
            await uploadParticipants(rows)
            displayAlert('Uploaded', `Successfully uploaded ${rows.length}.`, 'success')
            setRows([])
        } catch (error) {
            displayAlert('Error', `Upload fail ${error.message}.`, 'error')
        }
    }

    return (
        <div style={{
            position: 'relative',
            width: "95vw",
            height: "90vh",
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{
                border: `2px solid ${theme.palette.primary['main']}`,
                mt: '5rem',
                width: '70%',
                borderRadius: '5px'
            }}>
                <Box sx={{
                    backgroundColor: theme.palette.primary['light'],
                    padding: '1.5rem 0',
                    color: '#fff'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
                        <CloudUploadIcon fontSize='large' />
                        <Typography variant='h4'>Participants Upload</Typography>
                    </Box>
                </Box>

                <Box sx={{ padding: '1rem' }}>
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
                            onClick={handleUpload}
                            ><CloudUploadIcon /> Upload</Button>
                    </Box>

                    {rows.length > 0 ? <TableContainer component={Paper} sx={{ margin: '1rem 0', height: '60vh', overflowY: 'scroll' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    </TableContainer> : <Typography variant='h5'>Please select CSV to view data.</Typography>}

                </Box>
            </Box>
        </div>
    )
}

export default ParticipantUpload
