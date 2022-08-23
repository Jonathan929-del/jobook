// Imports
import axios from 'axios'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import {useSnackbar} from 'notistack'
import styled from 'styled-components'
import useStyles from '../styles/Styles'
import {IoImages} from 'react-icons/io5'
import {useState, useContext, useEffect} from 'react'
import {Button, Card, CardActions, Grid, Input, Typography, Container, Link, Menu, MenuItem, CircularProgress} from '@material-ui/core'



// Styles
const ShareImgContainer = styled.div`
  width:100%;
  height:100px;
  display:flex;
  margin-left:20px;
  align-items:center;
  justify-content:flex-start;
`



// Main Function
const Share = () => {

    // Variables
    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const {userInfo, darkMode} = state;
    const [isLoading, setIsLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [mood, setMood] = useState('');
    const [caption, setCaption] = useState('');
    const [imgError, setImgError] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const [img, setImg] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState('');
    const [fileInputState, setFileInputState] = useState('');
    const postId = Math.floor(Math.random() * 1000000000);
    const profileImgUrl = `https://res.cloudinary.com/jobook/image/upload/v1657393815/jobook/profilePic-${userInfo?.id}`;

    // Image Handlers
    const handleFileInputChange = e => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        setImg(`${userInfo?.id}-${postId}`);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setPreviewSource(reader.result);
        };
    };
    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios.post('/api/images/upload', {data:base64EncodedImage, id:img});
            setFileInputState('');
            setPreviewSource('');
            setSelectedFile('');
        } catch (err) {
            setImgError(true);
        }
    };


    // Other Handlers
    const postSubmitHandler = async e => {
        e.preventDefault();
        setIsLoading(true);
        if(selectedFile){      
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
              uploadImage(reader.result);
            };
            reader.onerror = () => {
                console.error('An error occured');
            };
        }
        dispatch({type:'POST_START'});
        try {
            if(!imgError){
                if(caption === '' && img === undefined){
                    setIsLoading(false);
                    enqueueSnackbar('Post is empty', {variant:'error'});
                }else{
                    dispatch({type:'POST_SUCCESS'});
                    const {data} = await axios.post('/api/posts', {
                        userId:userInfo.id,
                        caption,
                        img,
                        mood,
                        postId
                    }, {
                        headers:{
                            authorization:`Bearer ${userInfo.token}`
                        }
                    });
                    enqueueSnackbar('Post Submitted', {variant:'success'});
                    window.location.reload();
                }
            }else{
                dispatch({type:'POST_FAIL'});
                enqueueSnackbar('Image is too large', {variant:'error'});
            }
        } catch (err) {
            console.log(err);
            dispatch({type:'POST_FAIL'});
            enqueueSnackbar(err.response.data.message, {variant:'error'});
        }
        setFileInputState('');
        setPreviewSource('');
        setSelectedFile('');
        setMood('');
        setCaption('');
    }
    const buttonClickHandler = e => {
        setAnchorEl(e.currentTarget);
    };
    const buttonCloseHandler = () => {
        setAnchorEl(null);
    };
    const moodHandler = (mood) => {
        setMood(mood);
        buttonCloseHandler();
    };
    const closeImgHandler = () => {
        setFileInputState('');
        setPreviewSource('');
        setSelectedFile('');
    };

    useEffect(() => {
        setFileInputState('');
        setPreviewSource('');
        setSelectedFile('');
        setMood('');
        setCaption('');
    }, []);
     
    return (
        <Grid className={classes.shareCom}>
            <Card>
                <form onSubmit={postSubmitHandler} className={classes.postForm}>
                    <ShareImgContainer>
                        <NextLink href={`/profile/${userInfo?.id}`} passHref>
                            <Link>
                                <img src={userInfo?.profilePic ? profileImgUrl : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                            </Link>    
                        </NextLink>
                        <NextLink href={`/profile/${userInfo?.id}`} passHref>
                            <Link>
                                <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{userInfo?.name}</Typography>
                            </Link>
                        </NextLink>
                    </ShareImgContainer>
                    <Input placeholder={`What's on your mind ${userInfo?.name.split(' ')[0]}?`} className={classes.shareInput} value={caption} onChange={e => setCaption(e.target.value)}/>
                    {previewSource && <div className={classes.shareImgContainer}>
                            <img src={previewSource} alt='Selected Image' className={classes.postImg}/>
                            <Button className={classes.imgCloseButton} onClick={closeImgHandler}>X</Button>
                        </div>
                    }
                    <CardActions>
                        <Grid container className={classes.gridContainer}>
                            <Grid item>
                                <label htmlFor='file'>
                                    <input
                                        id="file"
                                        type="file"
                                        name="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                        style={{display:'none'}}
                                    />
                                    <Typography className={classes.photoSelect}><IoImages /> Photo</Typography>
                                </label>
                            </Grid>
                            <Grid item>
                                <Container className={classes.moodContainer}>
                                    <Button onClick={buttonClickHandler} className={classes.moodButton} aria-controls='menu' aria-haspopup='true'>Mood: </Button>
                                    <Menu id='menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={buttonCloseHandler}>
                                        <MenuItem onClick={() => moodHandler('Happy 😊')}>Happy 😊</MenuItem>
                                        <MenuItem onClick={() => moodHandler('Sad 😔')}>Sad 😔</MenuItem>
                                        <MenuItem onClick={() => moodHandler('Blessed 😇')}>Blessed 😇</MenuItem>
                                        <MenuItem onClick={() => moodHandler('Angry 😠')}>Angry 😠</MenuItem>
                                        <MenuItem onClick={() => moodHandler('Loved 🥰')}>Loved 🥰</MenuItem>
                                        <MenuItem onClick={() => moodHandler('Excited 😁')}>Excited 😁</MenuItem>
                                        {mood && <MenuItem onClick={() => moodHandler('')}>X</MenuItem>}
                                    </Menu>
                                    {mood && <Typography className={classes.mood}>{mood}</Typography>}
                                </Container>
                            </Grid>
                            <Grid item>
                                <Button type='submit' fullWidth><Typography className={classes.shareButton}>{isLoading ? <CircularProgress color='#fff'/> : 'Share'}</Typography></Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </form>
            </Card>
        </Grid>
    )
}


// Export
export default Share;