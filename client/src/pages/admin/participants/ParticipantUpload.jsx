import { useState } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';

const ParticipantUpload = () => {
    const theme = useTheme()
    const [rows, setRows] = useState()
    console.log("🚀 ~ ParticipantUpload ~ rows:", rows)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,         // first row → keys
            worker: true,         // parse in a Web Worker
            skipEmptyLines: true,
            complete: result => setRows(result.data),   // array of objects
            error: err => console.error(err)
        });
    };


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
                    <Button variant="contained" component="label">
                        Upload CSV File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>

                </Box>
            </Box>
        </div>
    )
}

export default ParticipantUpload
