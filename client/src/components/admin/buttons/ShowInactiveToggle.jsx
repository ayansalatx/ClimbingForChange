import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

const ActiveToggle = ({ checked, onChange, hidden }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'left', visibility: hidden }}>
      <FormControlLabel
        control={(
          <Switch
            size="small"
            checked={checked}
            onChange={onChange}
            sx={{
              '& .MuiSwitch-switchBase + .MuiSwitch-track': {
                backgroundColor: 'background.paper',
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'secondary.main',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'secondary.main',
              },
            }}
          />
        )}
        label={(
          <Typography
            fontSize="small"
            textTransform="uppercase"
            sx={{
              color: checked ? 'secondary.main' : 'background.paper',
              pr: 1,
            }}
          >
            Show Inactive
          </Typography>
        )}
        labelPlacement="start"
        sx={{ ml: 1.5 }}
      />
    </Box>
  )
}

export default ActiveToggle
