// Imports
import axios from 'axios'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import styled from 'styled-components'
import useStyles from '../styles/Styles'
import {useContext, useState, useEffect} from 'react'
import {Box, Drawer, Typography, List, ListItem, Container, Link} from '@material-ui/core'



// Styles
const LeftbarImgContainer = styled.div`
  width:100%;
  height:100px;
  display:flex;
  margin-left:20px;
  align-items:center;
  justify-content:flex-start;
`
const LikesListHeading = styled.h2`
  font-size:25px;
  margin:20px 100px;

  @media screen and (max-width:600px){
      margin:20px 50px; 
  }
  @media screen and (max-width:400px){
      margin:20px 0;
      text-align:center;
  }
`



// Main Function
const Likeslist = ({isLikesOpened, post, likesToggler, isLikeClicked}) => {
  
  const classes = useStyles();
  const {state} = useContext(Store);
  const [users, setUsers] = useState([]);
  const {darkMode} = state;

  const usersFetcher = async () => {
    try {
      const {data} = await axios.get(`/api/posts/likes/${post._id}`);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    usersFetcher();
  }, [post?._id, isLikeClicked]);

  return (
    <aside>
      <Drawer anchor='right' open={isLikesOpened} onClose={likesToggler(false)}>
        <Box role="presentation" className={classes.likesListBox}>
          <LikesListHeading>{post?.user.name.split(' ')[0]}'s post</LikesListHeading>
          <span style={{position:'absolute', top:25, left:20, fontSize:'20px', cursor:'pointer'}} onClick={likesToggler(false)}>X</span>
          <List>
            {users.length > 0 ? users.map(user => (
              <ListItem>
                <LeftbarImgContainer>
                    <NextLink href={`/profile/${user?._id}`} passHref>
                        <Link>
                            <img src={user?.profilePic !== '' ? `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}` : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                        </Link>    
                    </NextLink>
                    <NextLink href={`/profile/${user?._id}`} passHref>
                        <Link>
                            <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user?.name}</Typography>
                        </Link>
                    </NextLink>
                </LeftbarImgContainer>
            </ListItem>
            )) : <p style={{textAlign:'center'}}>This post has no likes.</p>}
          </List>
        </Box>
      </Drawer>
    </aside>
  );
}


// Export
export default Likeslist;