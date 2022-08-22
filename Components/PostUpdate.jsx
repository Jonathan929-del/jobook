// Imports
import axios from 'axios'
import dynamic from 'next/dynamic'
import {Store} from '../Utils/Store'
import useStyles from '../styles/Styles'
import {useContext, useEffect, useState} from 'react'
import {Card, Grid, Typography, Button, Input, Container, Menu, MenuItem} from '@material-ui/core'


// Main Function
const PostUpdate = ({post, setIsUpdate}) => {


    // Variables
    const classes = useStyles();
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [img, setImg] = useState();
    const [mood, setMood] = useState(post.mood);
    const [anchorEl, setAnchorEl] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState('');
    const [isCloseClick, setIsCloseClick] = useState(false);
    const [fileInputState, setFileInputState] = useState('');
    const [inputText, setInputText] = useState(post?.caption);
    const postImg = `https://res.cloudinary.com/jobook/image/upload/v1656754040/jobook/${post.img}`;


    // Image Handlers
    const handleFileInputChange = e => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        setImg(`${userInfo?.id}-${post?._id}-${Math.random(Math.floor() * 1000000000)}`);
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


    // Handlers
    const inputTextHandler = e => {
        setInputText(e);
    };
    const closeHandler = () => {
        setIsUpdate(false);
    };
    const imgCloser = () => {
        setPreviewSource('');
        setImg('');
        setIsCloseClick(true);
        console.log(isCloseClick);
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
    const updateHandler = async () => {
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
        try {
            console.log(post.img);
            console.log(img);
            await axios.put(`/api/posts/update/${post?._id}`, {caption:inputText, img, mood});
            setTimeout(() => {
                window.location.reload();
            }, 500)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    
    return (
        <div className={classes.postUpdateContainer}>
            <Card className={classes.postUpdateCard}>
                <Grid container className={classes.postUpdateGrid}>
                    <Grid item className={classes.postUpdateHeading}>
                        <Typography variant='h2' component='h2'>Update Post</Typography>
                        <Button className={classes.postUpdateClose} onClick={closeHandler}>X</Button>
                    </Grid>
                    <Grid item className={classes.postUpdateText}>
                        <Input value={inputText} onChange={e => inputTextHandler(e.target.value)} placeholder='Update text' fullWidth/>
                    </Grid>
                    {isCloseClick
                        ? ''
                        : previewSource
                            ? <Grid item className={classes.postUpdateImgContainer}>
                                <Button className={classes.postUpdateImgClose} onClick={imgCloser}>x</Button>
                                <img src={previewSource} className={classes.postUpdateImg}/>
                            </Grid>
                            : post?.img
                                ? <Grid item className={classes.postUpdateImgContainer}>
                                        <Button className={classes.postUpdateImgClose} onClick={imgCloser}>x</Button>
                                        <img src={postImg} className={classes.postUpdateImg}/>
                                    </Grid>
                                : ''
                    }
                    <Grid item className={classes.postUpdateButtonsContainer}>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            onChange={handleFileInputChange}
                            onClick={() => setIsCloseClick(false)}
                            value={fileInputState}
                        />
                        <Container className={classes.postUpdateMoodContainer}>
                            <Button onClick={buttonClickHandler} className={classes.postUpdateMoodButton} aria-controls='menu' aria-haspopup='true'>Mood: </Button>
                            <Menu id='menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={buttonCloseHandler}>
                                <MenuItem onClick={() => moodHandler('Happy 😊')}>Happy 😊</MenuItem>
                                <MenuItem onClick={() => moodHandler('Sad 😔')}>Sad 😔</MenuItem>
                                <MenuItem onClick={() => moodHandler('Blessed 😇')}>Blessed 😇</MenuItem>
                                <MenuItem onClick={() => moodHandler('Angry 😠')}>Angry 😠</MenuItem>
                                <MenuItem onClick={() => moodHandler('Loved 🥰')}>Loved 🥰</MenuItem>
                                <MenuItem onClick={() => moodHandler('Excited 😁')}>Excited 😁</MenuItem>
                                {mood && <MenuItem onClick={() => moodHandler('')}>X</MenuItem>}
                            </Menu>
                            {mood && <Typography className={classes.postUpdateMood}>{mood}</Typography>}
                        </Container>
                        <Button onClick={updateHandler}>Update</Button>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}


// Export
export default PostUpdate;