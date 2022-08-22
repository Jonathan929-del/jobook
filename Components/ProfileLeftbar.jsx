// Imports
import React from 'react'
import styled from 'styled-components'



// Styles
const LeftbarImgContainer = styled.div`
  width:100%;
  height:100px;
  display:flex;
  margin-left:20px;
  align-items:center;
  justify-content:flex-start;
`



// Main Function
const ProfileLeftbar = () => {
  return (
    <aside>
        <Card className={classes.sidebarBox}>
            {userInfo ? (
                    <>                        
                        <LeftbarImgContainer>
                            <NextLink href={`/profile/${userInfo.id}`} passHref>
                                <Link>
                                    <img src={imgUrl} className={classes.leftBarProfilePic}/>
                                </Link>    
                            </NextLink>
                            <NextLink href={`/profile/${userInfo.id}`} passHref>
                                <Link>
                                    <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{userInfo.name}</Typography>
                                </Link>
                            </NextLink>
                        </LeftbarImgContainer>
                        <div className={classes.leftBarFriendsContainer}>
                            <Typography component='h2' variant='h2' className={classes.leftbarHeading}>Other Users</Typography>
                            <List>
                                {users.map((user, index) => (
                                    <ListItem key={index}>
                                        <LeftbarImgContainer>
                                            <NextLink href={`/profile/${user._id}`} passHref>
                                                <Link>
                                                    <img src={`https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}`} className={classes.leftBarProfilePic}/>
                                                </Link>    
                                            </NextLink>
                                            <NextLink href={`/profile/${user._id}`} passHref>
                                                <Link>
                                                    <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user.name}</Typography>
                                                </Link>
                                            </NextLink>
                                        </LeftbarImgContainer>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </>
                ):(
                    <h1>Login</h1>
                )
            }
        </Card>
    </aside>
  )
}


// Export
export default ProfileLeftbar;