// Imports
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import DrawerCom from './DrawerCom'
import useStyles from '../styles/Styles'
import {useContext, useEffect, useState} from 'react'
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai'
import {Typography, AppBar, Link, Toolbar, Switch, Button, Menu, MenuItem} from '@material-ui/core'

// Main Function
const Nav = ({title, user}) => {

  const classes = useStyles();
  const {state, dispatch} = useContext(Store);
  const {userInfo, darkMode} = state;
  const [anchorEl, setAnchorEl] = useState(false);
  const [windowWidth, setWindowWidth] = useState();
  const [anotherUserProfile, setAnotherUserProfile] = useState(false);
  const [openState, setOpenState] = useState(false);
  const darkModeHandler = () => {
    if(darkMode){
      dispatch({type:'DARK_MODE_OFF'});
      Cookies.set('darkMode', false);
    }else{
      dispatch({type:'DARK_MODE_ON'})
      Cookies.set('darkMode', true);
    }
  };
  const buttonClickHandler = e => {
    setAnchorEl(e.currentTarget);
  };
  const buttonCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch({type:'USER_LOGOUT'});
    Cookies.remove('userInfo');
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }
    setOpenState(open);
};
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if(user?.name !== userInfo?.name && user){
      setAnotherUserProfile(true);
    }else{
      setAnotherUserProfile(false);
    }
  }, [user?.name]);
  window.onresize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  return (
    <nav>
        <AppBar className={classes.navbar}>
            {windowWidth > 600 && title === 'Register' && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <div className={classes.navContainer}>
                <Switch onClick={darkModeHandler} checked={darkMode}/>
                <NextLink href='/' passHref>
                  <Link>
                    <AiFillHome className={classes.icon}/>
                  </Link>
                </NextLink>
                <NextLink href='/login' passHref>
                  <Link>
                    <p className={classes.button}>Login</p>
                  </Link>
                </NextLink>
              </div>
            </Toolbar>}
            {windowWidth > 600 && title === 'Login' && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <div className={classes.navContainer}>
                <Switch onClick={darkModeHandler} checked={darkMode}/>
                <NextLink href='/' passHref>
                  <Link>
                    <AiFillHome className={classes.icon}/>
                  </Link>
                </NextLink>
                <NextLink href='/register' passHref>
                  <Link>
                    <p className={classes.button}>Register</p>
                  </Link>
                </NextLink>
              </div>
            </Toolbar>}
            {windowWidth > 600 && title === 'Info' && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <Switch onClick={darkModeHandler} checked={darkMode}/>
            </Toolbar>}
            {windowWidth > 600 && title === 'Home Page' && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <input className={classes.navInput} placeholder='Search Friends'/>
              <div className={classes.navContainer}>
                <Switch onClick={darkModeHandler} checked={darkMode}/>
                {userInfo ? (
                  <>                  
                    <Button onClick={buttonClickHandler} className={classes.button} aria-controls='menu' aria-haspopup='true' style={{color:'#fff'}}>
                      {userInfo.name.split(' ')[0]}
                    </Button>
                    <Menu id='menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={buttonCloseHandler}>
                      <MenuItem onClick={buttonCloseHandler}>
                        <NextLink href={`/profile/${userInfo?.id}`} passHref>
                          <Link>
                            Profile
                          </Link>
                        </NextLink>
                      </MenuItem>
                      <MenuItem>
                        <NextLink href='/login' passHref>
                          <Link onClick={logoutHandler}>
                            Logout
                          </Link>
                        </NextLink>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink href='/login' passHref>
                    <Link>
                      <p className={classes.button}>Login</p>
                    </Link>
                  </NextLink>
                )}
              </div>
            </Toolbar>}
            {windowWidth > 600 && title === userInfo?.name && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <input className={classes.navInput} placeholder='Search Friends'/>
              <div className={classes.navContainer}>
                <Switch onClick={darkModeHandler} checked={darkMode}/>
                {userInfo ? (
                  <>                  
                      <NextLink href='/' passHref>
                        <Link>
                          <AiFillHome className={classes.icon}/>
                        </Link>
                      </NextLink>
                      <MenuItem>
                        <NextLink href='/login' passHref>
                          <Link onClick={logoutHandler}>
                            Logout
                          </Link>
                        </NextLink>
                      </MenuItem>
                  </>
                ) : (
                  <NextLink href='/login' passHref>
                    <Link>
                      <p className={classes.button}>Login</p>
                    </Link>
                  </NextLink>
                )}
              </div>
            </Toolbar>}
            {windowWidth > 600 && anotherUserProfile && <Toolbar className={classes.spaceBetween}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              <input className={classes.navInput} placeholder='Search Friends'/>
              <div className={classes.navContainer}>
                <Switch onClick={darkModeHandler} checked={darkMode}/>
                {userInfo ? (
                  <>                  
                      <NextLink href='/' passHref>
                        <Link>
                          <AiFillHome className={classes.icon}/>
                        </Link>
                      </NextLink>
                      <NextLink href='/login' passHref>
                        <Link>
                          <p className={classes.button} onClick={logoutHandler}>Logout</p>
                        </Link>
                      </NextLink>
                  </>
                ) : (
                  <>
                    <NextLink href='/' passHref>
                      <Link style={{marginRight:'10px'}}>
                        <AiFillHome className={classes.icon}/>
                      </Link>
                    </NextLink>
                    <NextLink href='/login' passHref>
                      <Link>
                        <p className={classes.button}>Login</p>
                      </Link>
                    </NextLink>
                  </>
                )}
              </div>
            </Toolbar>}
            {windowWidth < 600 && <Toolbar className={classes.responsiveToolbar}>
              <NextLink href='/' passHref>
                <Link>
                  <Typography className={classes.brand}>JoBook</Typography>
                </Link>
              </NextLink>
              {title === 'Home Page' && <input className={classes.navInput} placeholder='Search Friends'/>}
              {title === userInfo?.name && <input className={classes.navInput} placeholder='Search Friends'/>}
              {anotherUserProfile && <input className={classes.navInput} placeholder='Search Friends'/>}
              <Button onClick={toggleDrawer(true)} style={{color:'white'}}><AiOutlineMenu className={classes.menu}/></Button>
              <DrawerCom props={{darkModeHandler, logoutHandler, buttonCloseHandler, buttonClickHandler, title, anchorEl, setAnchorEl, user, openState, toggleDrawer}} />
            </Toolbar>}
        </AppBar>
    </nav>
  )
}


// Export
export default Nav;