// Imports
import axios from 'axios'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import useStyles from '../styles/Styles'
import {useContext, useEffect, useState} from 'react'
import {Card, Container, Link, List, ListItem, Typography, Box, BottomNavigation, BottomNavigationAction} from '@material-ui/core'


// Main Function
const Leftbar = () => {

    const classes = useStyles();
    const {state} = useContext(Store);
    const {userInfo, darkMode} = state;
    const [allUsers, setAllUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [value, setValue] = useState(0);
    const imgUrl = `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${userInfo?.id}`;


    const usersFetcher = async () => {
        try {
            const res = await axios.get('/api/users');
            const followersData = userInfo ? await axios.get(`/api/users/followers/${userInfo?.id}`, {headers:{authorization:`Bearer ${userInfo?.token}`}}) : [];
            const followingData = userInfo ? await axios.get(`/api/users/following/${userInfo?.id}`, {headers:{authorization:`Bearer ${userInfo?.token}`}}) : [];
            setAllUsers(userInfo !== null ? res.data.filter(user => user._id !== userInfo?.id) : res.data);
            setFollowers(followersData.data);
            setFollowings(followingData.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        usersFetcher();
    }, [value, userInfo?.followers, userInfo?.following]);

    return (
        <aside className={classes.sidebar}>
            <Card className={classes.sidebarBox}>
                {userInfo && <Container className={classes.leftBarImgContainer}>
                    <NextLink href={`/profile/${userInfo.id}`} passHref>
                        <Link>
                            <img src={userInfo?.profilePic ? imgUrl : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                        </Link>    
                    </NextLink>
                    <NextLink href={`/profile/${userInfo.id}`} passHref>
                        <Link>
                            <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{userInfo.name}</Typography>
                        </Link>
                    </NextLink>
                </Container>}
                <div className={classes.leftBarFriendsContainer}>
                    <Typography component='h2' variant='h2' className={classes.leftbarHeading}>
                        <Box>
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label='Users'/>
                                {userInfo && <BottomNavigationAction label='Followers'/>}
                                {userInfo && <BottomNavigationAction label='Following'/>}
                            </BottomNavigation>
                        </Box>
                    </Typography>
                    <List style={{height:'80vh', overflowY:'scroll'}}>
                        {value === 0 && allUsers.map((user, index) => (
                            <ListItem key={index}>
                                <Container className={classes.leftBarImgContainer}>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <img src={user?.profilePic ? `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}` : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                                        </Link>    
                                    </NextLink>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user.name}</Typography>
                                        </Link>
                                    </NextLink>
                                </Container>
                            </ListItem>
                        ))}
                        {value === 1 && followers.map((user, index) => (
                            <ListItem key={index}>
                                <Container className={classes.leftBarImgContainer}>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <img src={user?.profilePic ? `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}` : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                                        </Link>    
                                    </NextLink>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user.name}</Typography>
                                        </Link>
                                    </NextLink>
                                </Container>
                            </ListItem>
                        ))}
                        {value === 2 && followings.map((user, index) => (
                            <ListItem key={index}>
                                <Container className={classes.leftBarImgContainer}>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <img src={user?.profilePic ? `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}` : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                                        </Link>    
                                    </NextLink>
                                    <NextLink href={`/profile/${user._id}`} passHref>
                                        <Link>
                                            <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user.name}</Typography>
                                        </Link>
                                    </NextLink>
                                </Container>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Card>
        </aside>
    )
}


// Export
export default Leftbar;