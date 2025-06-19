import { Alert, AlertTitle, Snackbar } from '@mui/material'

import { useGlobalState } from '../state'

const AlertDisplay = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useGlobalState()


  return state.alert && <Snackbar
    open={state.alert}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert severity={state.alert.type}>
      <AlertTitle>{state.alert.title}</AlertTitle>
      {state.alert.message}
    </Alert>
  </Snackbar>
}

export default AlertDisplay
