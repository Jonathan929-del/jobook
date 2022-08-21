// Imports
import Nav from './Nav'
import Head from 'next/head'
import Leftbar from './Leftbar'
import dynamic from 'next/dynamic'
import {Store} from '../Utils/Store'
import useStyles from '../styles/Styles'
import {useContext, useEffect, useState} from 'react'
import {CssBaseline, ThemeProvider, createTheme} from '@material-ui/core'


// Main Function
const Layout = ({children, title, user}) => {

  const classes = useStyles();
  const {state} = useContext(Store);
  const {darkMode} = state;
  const [isLeftbar, setIsLeftbar] = useState();

  useEffect(() => {
    if(title !== 'Register' && title !== 'Login' && title !== 'Info'){
      setIsLeftbar(true);
    }
  }, [title]);

  const theme = createTheme({
    typography:{
        h1:{
            fontSize:'1.6rem',
            fontWeight:400,
            margin:'1rem 0'
        },
        h2:{
          fontWeight:400,
          margin:'1rem 0',
          fontSize:'1.4rem',
        }
    },
    palette:{
        type:JSON.parse(darkMode) ? 'dark' : 'light',
        primary:{
          main:'#1877f2'
        },
        secondary:{
          main:'#208080'
        },
        string:{
          main:'#ffffff'
        }
    }
  });

  return (
    <div>
        <Head>
            <title>{title ? `JoBook - ${title}` : 'JoBook'}</title>
            {title && <meta name="description" content={title} />}
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Nav title={title} user={user}/>
          <div className={classes.wrapper}>
            {isLeftbar && <Leftbar />}
            <div className={classes.footerWrapper}>
              <div className={classes.main}>
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
    </div>
  )
}


// Export
export default dynamic(() => Promise.resolve(Layout), {ssr:false});