import { alpha, Autocomplete, Box, TextField } from '@mui/material'

import theme from '../../../styles/theme'

const ProgressSearch = ({ searchString, onChange, teamNames }) => {
  return (
    <Box
      sx={{
        width: {
          xxs: '100%',
          xs: '100%',
          sm: '100%',
          md: '45%',
          lg: '40%',
          xl: '35%',
        },
        textAlign: 'left',
        backgroundColor: { xxs: 'background.paper', sm: alpha(theme.palette.background.paper, 0.4) },
        color: 'primary.main',
        borderRadius: '3px',
        '&:hover': {
          backgroundColor: { xxs: 'info.main', sm: alpha(theme.palette.info.main, 0.5) },
        },
      }}
    >
      {/* Use MUI Autocomplete to display search suggestions for teams */}
      <Autocomplete
        size='small'
        freeSolo // Allow any input - not limited to the options
        id='progress-search'
        disableClearable
        options={teamNames} // List of team names as suggestions
        inputValue={searchString}
        // Notify Progress Board of input change
        onInputChange={(event, newInputValue) => {
          onChange(newInputValue)
        }}
        slotProps={{
          paper: {
            sx: {
              minHeight: { xxs: 'unset', xs: 'unset', sm: 0 },
              borderRadius: '3px',
              backgroundColor: 'background.paper',
              color: 'primary.main',
              fontSize: { xxs: '.9rem', md: '1rem' },
              '& .MuiAutocomplete-option': {
                minHeight: { xxs: 'unset' },
                py: 0.5,
                borderRadius: '3px',
                color: 'primary.main',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  borderRadius: '3px',
                  backgroundColor: {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                  },
                  '&:focus': {
                    borderRadius: '3px',
                    backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                  },
                },
              },
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={'Search...'}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
            sx={{
              '& input::placeholder': {
                opacity: 0.65,
              },
              '& .MuiOutlinedInput-root': {
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                padding: 0,
                fontSize: {
                  xxs: '.85rem',
                  xs: '.85rem',
                  sm: '0.85rem',
                  md: '0.9rem',
                  lg: '1rem',
                  xl: '1.05rem',
                },
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
                pb: {
                  xxs: '1px !important',
                  xs: '1px !important',
                  sm: '2px !important',
                  md: '2px !important',
                  lg: '2px !important',
                  xl: '2px !important',
                },
              },
            }}
          />
        )}
      />
    </Box>
  )
}

export default ProgressSearch
