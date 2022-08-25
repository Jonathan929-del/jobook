// Imports
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import styled from 'styled-components'
import useStyles from '../styles/Styles'
import {AiFillHome} from 'react-icons/ai'
import ResponsiveLeftbar from './ResponsiveLeftbar'
import {useState, useContext, useEffect} from 'react'
import {List, ListItem, Switch, Box, Drawer, Button, Link, MenuItem} from '@material-ui/core'



// Styles
const CloseIcon = styled.span`
  cursor:pointer;
  font-size:25px;
  margin-left:50px;
  transition:0.2s linear;

  &:hover{
    color:#1877f2;
  }
`



// Main Function
const DrawerCom = ({props}) => {
  
  const classes = useStyles();
  const {state} = useContext(Store);
  const {darkMode, userInfo} = state;
  const [anotherUserProfile, setAnotherUserProfile] = useState(false);

  useEffect(() => {
    if(props.user?.name !== userInfo?.name && props.user){
      setAnotherUserProfile(true);
    }else{
      setAnotherUserProfile(false);
    }
  }, [props.user?.name]);

  return (
      <Drawer anchor='left' open={props.openState} onClose={props.toggleDrawer(false)}>
          <List>
            <ListItem style={{width:'100%', display:'flex', justifyContent:'center'}}>
              <Switch onClick={props.darkModeHandler} checked={darkMode}/>
              <CloseIcon onClick={props.toggleDrawer(false)}>x</CloseIcon>
            </ListItem>
            <ListItem>
              {props.title === 'Login' && 
                  <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
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
              }
              {props.title === 'Register' && 
                  <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column'}}>
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
              }
              {props.title === 'Home Page' ? userInfo ? (
                  <div className={classes.menuItemsContainer}>
                      <MenuItem onClick={props.buttonCloseHandler}>
                        <NextLink href={`/profile/${userInfo?.id}`} passHref>
                          <Link style={{color:'#fff'}}>
                            Profile
                          </Link>
                        </NextLink>
                      </MenuItem>
                      <MenuItem>
                        <NextLink href='/login' passHref>
                          <Link onClick={props.logoutHandler} style={{color:'#fff'}}>
                            Logout
                          </Link>
                        </NextLink>
                      </MenuItem>
                  </div>
                  ) : (
                    <NextLink href='/login' passHref>
                      <Link style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column', color:'white', backgroundColor:'red'}}>
                        Login
                      </Link>
                    </NextLink>
                  ) : ''
              }
              {props.title === userInfo?.name &&
                  <div className={classes.menuItemsContainer}>
                      <MenuItem onClick={props.buttonCloseHandler}>
                        <NextLink href='/' passHref>
                          <Link style={{color:'#fff', fontSize:'20px'}}>
                            <AiFillHome />
                          </Link>
                        </NextLink>
                      </MenuItem>
                      <MenuItem>
                        <NextLink href='/login' passHref>
                          <Link onClick={props.logoutHandler} style={{color:'#fff', fontSize:'15px'}}>
                            Logout
                          </Link>
                        </NextLink>
                      </MenuItem>
                  </div>
              }
              {anotherUserProfile && <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                {userInfo ? (
                    <>                  
                        <NextLink href='/' passHref>
                          <Link>
                            <AiFillHome className={classes.icon}/>
                          </Link>
                        </NextLink>
                        <NextLink href='/login' passHref>
                          <Link>
                            <p className={classes.button} onClick={props.logoutHandler}>Logout</p>
                          </Link>
                        </NextLink>
                    </>
                  ) : (
                    <div style={{display:'flex'}}>
                      <NextLink href='/' passHref>
                        <Link>
                          <AiFillHome className={classes.icon} style={{marginLeft:'50px'}}/>
                        </Link>
                      </NextLink>
                      <NextLink href='/login' passHref>
                        <Link>
                          <p className={classes.button} style={{marginLeft:'50px'}}>Login</p>
                        </Link>
                      </NextLink>
                    </div>
                  )}
                </div>}
            </ListItem>
            <hr />
            <ListItem style={{overflow:'hidden'}}>
              <ResponsiveLeftbar />
            </ListItem>
          </List>
      </Drawer>
  );
}


// Export
export default DrawerCom;