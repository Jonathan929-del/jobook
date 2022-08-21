/// Imports
import axios from 'axios'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import useStyles from '../styles/Styles'
import {useContext, useState, useEffect} from 'react'
import {Box, Drawer, Typography, List, ListItem, Card, Container, Link} from '@material-ui/core'


// Main Function
const Commentslist = ({isCommentsOpened, post, commentsToggler, commentHandler}) => {
  
  const classes = useStyles();
  const {state} = useContext(Store);
  const [comments, setComments] = useState([]);
  const {darkMode} = state;

  const commentsFetcher = async () => {
    try {
      const {data} = await axios.get(`/api/comments/${post._id}`);
      setComments(data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    commentsFetcher();
  }, [post?._id, commentHandler]);

  return (
    <aside>
      <Drawer anchor='right' open={isCommentsOpened} onClose={commentsToggler(false)}>
        <Box role="presentation" className={classes.likesListBox} fullWidth>
          <Typography component='h4' className={classes.likesListHeading}>{post?.user.name.split(' ')[0]}'s post</Typography>
          <span onClick={commentsToggler(false)} style={{position:'absolute', top:25, left:20, fontSize:'20px', cursor:'pointer'}}>X</span>
          <List fullWidth>
            {comments.map(comment => (
              <ListItem fullWidth>
                <Card fullWidth style={{width:'100%'}}>
                  <Container className={classes.leftBarImgContainer} style={{width:'100%'}}>
                      <NextLink href={`/profile/${comment?.userId}`} passHref>
                          <Link>
                              <img src={comment?.user.profilePic !== '' ? `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${comment?.userId}` : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                          </Link>    
                      </NextLink>
                      <NextLink href={`/profile/${comment?.userId}}`} passHref>
                          <Link>
                              <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{comment?.user.name}</Typography>
                          </Link>
                      </NextLink>
                  </Container>
                  <Typography className={classes.comment}>{comment.comment}</Typography>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </aside>
  );
}


// Export
export default dynamic(() => Promise.resolve(Commentslist), {ssr:false});