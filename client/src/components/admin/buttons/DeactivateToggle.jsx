const DeactivateToggle = (checked, onChange) => {
  return (
    <Switch
      size="small"
      checked={checked}
      onChange={onChange}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'info.light',
        },
        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
          backgroundColor: 'info.light',
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: 'gray.main',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'gray.main',
        },
      }}
    />
  )
}

export default DeactivateToggle
