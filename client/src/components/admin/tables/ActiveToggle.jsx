import { Box, FormControlLabel, Switch, Typography } from '@mui/material'

const ActiveToggle = ({ checked, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'left' }}>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={checked}
            onChange={onChange}
            color="primary"
          />
        }
        label={
          <Typography
            fontSize={'small'}
            textTransform={'uppercase'}
            sx={{ color: checked ? 'primary.main' : 'background.paper', pr: 1 }}
          >
            Show Inactive
          </Typography>
        }
        labelPlacement="start"
        sx={{ ml: 1.5 }}
      />
    </Box>
  )
}

export default ActiveToggle
