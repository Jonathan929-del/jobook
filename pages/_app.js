// Imports
import '../styles/globals.css'
import {useEffect} from 'react'
import {SnackbarProvider} from 'notistack'
import {StoreProvider} from '../Utils/Store'


// Main Function
const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles && jssStyles.parentElement.removeChild(jssStyles);
  }, []);
  return (
      <StoreProvider>
        <SnackbarProvider preventDuplicate anchorOrigin={{vertical:'top', horizontal:'center'}}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </StoreProvider>
  )
}


// Export
export default MyApp;