import { Box, Card, Typography } from '@mui/material'

const ProgressCard = ({team}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
      <Box>
        <Typography>Team Name</Typography>
        <Typography>Mountain</Typography>
        <Typography>00:00:00</Typography>
      </Box>
      <Box>
        <Typography>0 / 194</Typography>
        <Typography>0/29029</Typography>
        <Typography>00:00:00</Typography>
      </Box>
    </Card>
  )
}

export default ProgressCard
