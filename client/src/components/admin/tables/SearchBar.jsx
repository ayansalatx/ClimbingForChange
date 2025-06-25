import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { alpha,styled } from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.25),
  '&:hover, &:focus-within': {
    backgroundColor: alpha(theme.palette.background.paper, 0.35),
  },
  marginRight: '.75rem',
  marginTop: '.1rem',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '25.4rem',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.background.paper,

}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color:  alpha(theme.palette.background.paper, 1),
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}))

const SearchBar = ({ value, onChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Search>
  )
}

export default SearchBar
