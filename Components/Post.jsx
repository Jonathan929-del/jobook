// Imports
import axios from 'axios'
import moment from 'moment'
import NextLink from 'next/link'
import Likeslist from './LikesList'
import {Store} from '../Utils/Store'
import {useSnackbar} from 'notistack'
import PostUpdate from './PostUpdate'
import {IoSend} from 'react-icons/io5'
import styled from 'styled-components'
import useStyles from '../styles/Styles'
import {AiFillLike} from 'react-icons/ai'
import CommentsList from './CommentsList'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {useContext, useEffect, useState} from 'react'
import {Button, Card, Grid, Input, Link, Typography, Menu, MenuItem} from '@material-ui/core'



// Styles
const PostImgContainer = styled.div`
  width:100%;
  height:100px;
  display:flex;
  margin-left:10px;
  position:relative;
  align-items:center;
  justify-content:flex-start;
`
const Feeling = styled.span`
  font-size:13px;
  margin-left:10px;
  color:${({darkMode}) => darkMode ? '#ccc' : '#000'};

  @media screen and (max-width:400px){
      font-size:11px;
      margin-left:5px;
  }
`
const PostDate = styled.span`
  top:60px;
  left:60px;
  font-size:11px;
  position:absolute;
  color:${({darkMode}) => darkMode ? '#ccc' : '#000'};

  @media screen and (max-width:400px){
    top:55px;
    left:35px;
    font-size:10px;
  }
`
const PostForm = styled.form`
  width:100%;
  display:flex;
  position:relative;
  flex-direction:column;
`
const CommentPostButton = styled.button`
  top:15px;
  right:20px;
  border:none;
  outline:none;
  cursor:pointer;
  position:absolute;
  transition:0.2s linear;
  background-color:transparent;
  color:${({darkMode}) => darkMode ? '#fff' : '#000'};

  &:hover{
    color:#1877f2;
  }
`
const PostCaption = styled.p`
  margin-left:30px;
  margin-bottom:20px;

  @media screen and (max-width:400px){
    font-size:15px;
    margin-left:5px;
  }
`


// Main Function
const Post = ({post}) => {

  // Variables
  const classes = useStyles();
  const {state} = useContext(Store);
  const {userInfo, darkMode} = state;
  const {enqueueSnackbar} = useSnackbar();
  const [isUpdate, setIsUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentCount, setCommentCount] = useState();
  const [isLikeClicked, setIsLikeClicked] = useState();
  const [isLikesOpened, setIsLikesOpened] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);
  const img = `https://res.cloudinary.com/jobook/image/upload/v1656754040/jobook/${post.img}`;
  const [profileImage, setProfileImage] = useState({});


  // Post delete handler
  const deleteHandler = async () => {
    try {
      const {data} = await axios.delete(`/api/posts/delete/${post?._id}`);
      enqueueSnackbar(data, {variant:'success'});
      setAnchorEl(null);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };


  // Post update handler
  const updateHandler = () => {
    setAnchorEl(null);
    setIsUpdate(true);
  };


  // Like handler
  const likeHandler = async () => {
    setIsLikeClicked(!isLikeClicked);
    try {
      const {data} = await axios.put(`/api/posts/like/${post?._id}`, {userId:userInfo?.id}, {headers:{authorization:`Bearer ${userInfo?.token}`}});
      data.likes.includes(userInfo?.id) ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
    } catch (err) {
      console.log(err);
    }
  };


  // Likes list toggler
  const likesToggler = (open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }
    setIsLikesOpened(open);
  };


  // Comment handler
  const commentTextHandler = e => {
    setCommentText(e);
  }
  const commentHandler = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/comments', {userId:userInfo.id, postId:post._id, comment:commentText}, {headers:{authorization:`Bearer ${userInfo?.token}`}});
      setCommentText('');
      setIsCommentsOpened(true);
    } catch (err) {
      console.log(err);
    }
  }


  // Comments list toggler
  const commentsToggler = (open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }
    setIsCommentsOpened(open);
  };


  // Other handlers
  const buttonClickHandler = e => {
    setAnchorEl(e.currentTarget);
  };
  const buttonCloseHandler = () => {
    setAnchorEl(null);
  };


  // Use effect
  useEffect(() => {
    document.body.style.overflow = "scroll";
    setIsLikeClicked(post.likes.includes(userInfo?.id));
    const commentsNum = async () => {
      const {data} = await axios.get(`/api/comments/${post._id}`);
      setCommentCount(data.length);
    }
    const ImagesFetcher = async () => {
      try {
        const res = await axios.get('/api/images/fetch');
        setProfileImage(res.data.resources.filter(img => img.filename.split('-')[1] === post.userId)[0].url);
      } catch (err) {
        console.log(err);
      }
    }
    ImagesFetcher();
    commentsNum();
  }, [isUpdate]);

  return (
    <Card className={classes.postContainer} style={{display:isDeleted && 'none'}}>
      {isUpdate && <PostUpdate setIsUpdate={setIsUpdate} post={post}/>}
      <Likeslist isLikesOpened={isLikesOpened} likesToggler={likesToggler} isLikeClicked={isLikeClicked} post={post}/>
      <CommentsList isCommentsOpened={isCommentsOpened} commentsToggler={commentsToggler} commentHandler={commentHandler} post={post}/>
      <Grid container>
        <Grid item className={classes.postUserNameArea}>
            <PostImgContainer>
                <NextLink href={`/profile/${post.userId}`} passHref>
                    <Link>
                        <img src={post?.user?.profilePic ? profileImage : '/Images/NoUser.png'} className={classes.postProfilePic}/>
                    </Link>    
                </NextLink>
                <NextLink href={`/profile/${post.userId}`} passHref>
                    <Link>
                        <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}} className={classes.postUsername}>{post?.user.name}</Typography>
                    </Link>
                </NextLink>
                {post.mood && <Feeling darkMode={darkMode}>is feeling {post.mood}</Feeling>}
                <PostDate darkMode={darkMode}>{moment(post.createdAt).fromNow()}</PostDate>
            </PostImgContainer>
          {post?.userId === userInfo?.id && <Typography>
            <Button onClick={buttonClickHandler} className={classes.button} aria-controls='menu' aria-haspopup='true'>
              <BiDotsVerticalRounded className={classes.postUpperIcon}/>
            </Button>
            <Menu id='menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={buttonCloseHandler}>
              <MenuItem onClick={updateHandler}>
                Update
              </MenuItem>
              <MenuItem onClick={deleteHandler}>
                Delete
              </MenuItem>
            </Menu>
          </Typography>}
        </Grid>
        <Grid item>
          <PostCaption>{post.caption}</PostCaption>
        </Grid>
        {post.img && <Grid item>
          <img src={img} style={{width:'100%'}}/>
        </Grid>}
        <Grid item className={classes.postInputContainer}>
          <PostForm onSubmit={commentHandler}>
            <Input style={{fontSize:'11px'}} fullWidth placeholder={`Leave ${post?.user.name.split(' ')[0]} a comment`} className={classes.postInput} value={commentText} onChange={e => commentTextHandler(e.target.value)}/>
            <CommentPostButton darkMode={darkMode}><IoSend /></CommentPostButton>
          </PostForm>
        </Grid>
        <Grid item className={classes.postBottom}>
          <div className={classes.likesContainer}>
            <Button className={classes.postButtonContainer} onClick={likeHandler}><AiFillLike className={classes.postLikeIcon} style={{color:isLikeClicked ? '#1877f2' : ''}}/></Button>
            {likeCount}
            <span onClick={likesToggler(true)} style={{cursor:'pointer', marginLeft:'5px'}}>Likes</span>
          </div>
          <div className={classes.commentsContainer}>
            <Button className={classes.commentsButton} onClick={commentsToggler(true)}>Comments: {commentCount}</Button>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}


// Export
export default Post;