import { Box, Card, Typography } from '@mui/material'

const ProgressCard = ({ team }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography>Team Name</Typography>
        <Typography>Mountain</Typography>
        <Typography>00:00:00</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography>0 / 194</Typography>
        <Typography>0/29029</Typography>
        <Typography>00:00:00</Typography>
      </Box>
    </Card>
  )
}

export default ProgressCard
