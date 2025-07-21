import { Switch } from '@mui/material'

const DeactivateToggle = (checked, onChange) => {
  return (
    <Switch
      size="small"
      checked={checked}
      onChange={onChange}
      sx={{
        '& .MuiSwitch-switchBase': {
          color: 'gray.main',
        },
        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
          backgroundColor: 'gray.main',
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'info.light',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'info.light',
        },
      }}
    />
  )
}

export default DeactivateToggle
