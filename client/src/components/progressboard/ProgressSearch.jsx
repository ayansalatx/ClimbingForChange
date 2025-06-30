import { Autocomplete, Box, TextField, alpha } from '@mui/material'

import theme from '../../styles/theme'

const ProgressSearch = ({ searchString, onChange, teamNames }) => {
  return (
    <Box
      sx={{
        width: '28%',
        textAlign: 'left',
        background: alpha(theme.palette.background.paper, 0.4),
        color: 'primary.main',
        borderRadius: '3px',
        '&:hover': {
          background: alpha(theme.palette.background.paper, 0.15),
        },
      }}
    >
      {/* Use MUI Autocomplete to display search suggestions for teams */}
      <Autocomplete
        size="small"
        freeSolo // Allow any input - not limited to the options
        id="progress-search"
        disableClearable
        options={teamNames} // List of team names as suggestions
        inputValue={searchString}
        // Notify Progress Board of input change
        onInputChange={(event, newInputValue) => {
          onChange(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            slotProps={{
              input: {
                ...params.InputProps,
                disableUnderline: true,
                type: 'search',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent',
                padding: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputBase-root': {
                outline: 'none',
                border: 'none',
                color: 'primary.main',
                pt: '2px !important',
                pr: '0 !important',
                pl: '0 !important',
                pb: '2px !important',
              },
            }}
          />
        )}
      />
    </Box>
  )
}

export default ProgressSearch
