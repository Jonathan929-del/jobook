// Imports
import axios from 'axios'
import Cookies from 'js-cookie'
import {Store} from '../../Utils/Store'
import Feed from '../../Components/Feed'
import useStyles from '../../styles/Styles'
import User from '../../Server/Models/User'
import Post from '../../Server/Models/Post'
import Layout from '../../Components/Layout'
import dbConnection from '../../Server/DBConnnect'
import {useContext, useEffect, useState} from 'react'
import {Box, Container, Typography, Button, Image} from '@material-ui/core'


// Main Function
const Profile = ({user, posts}) => {

    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const {userInfo, darkMode} = state;
    const [isFollowed, setIsFollowed] = useState();
    const [img, setImg] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState('');
    const [fileInputState, setFileInputState] = useState('');
    const imgUrl = `https://res.cloudinary.com/jobook/image/upload/v1656746051/jobook/profilePic-${user?._id}`;
    const backgroundImgUrl = `https://res.cloudinary.com/jobook/image/upload/v1657914145/jobook/${user?.backgroundPic}`;
    const arrangedPosts = posts.sort(
        (p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        }
    );

    useEffect(() => {
        user;
        setIsFollowed(userInfo?.following.includes(user?._id));
    }, [user]);


    // Image Handlers
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        setImg(`backgroundPic-${userInfo.id}`);
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
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (err) {
            setImgError(true);
            console.error(err);
        }
    };


    // Update Handler
    const updateHandler = async () => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          uploadImage(reader.result);
        };
        reader.onerror = () => {
          console.error('An error occured');
        };
        dispatch({type:'USER_LOGIN_START'});
        try {
            const {data} = await axios.put(`/api/users/update/${userInfo?.id}`, {backgroundPic:img}, {headers:{authorization:`Bearer ${userInfo?.token}`}});
            Cookies.set('userInfo', JSON.stringify(data));
            dispatch({type:'USER_LOGIN_SUCCESS', payload:data});
            console.log(data);
        } catch (err) {
            dispatch({type:'USER_LOGIN_FAIL'});
        }
    }


    // Follow Handler
    const followHandler = async () => {
        setIsFollowed(!isFollowed);
        dispatch({type:'USER_LOGIN_START'});
        try {            
            const {data} = await axios.put(`/api/users/follow/${user?._id}`, {id:userInfo?.id}, {
                headers:{
                    authorization:`Bearer ${userInfo?.token}`
                }
            });
            Cookies.set('userInfo', JSON.stringify(data));
            dispatch({type:'USER_LOGIN_SUCCESS', payload:data});
        } catch (err) {
            dispatch({type:'USER_LOGIN_FAIL'})
        }
    }

    return (
        <Layout title={user?.name} user={user}>
            <Box className={classes.backgroundPicCom}>
                {!user?.backgroundPic
                    ? user?._id === userInfo?.id
                        ? previewSource
                            ? <div style={{width:'100%', height:'60%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
                                <img src={previewSource} style={{width:'100%', height:'100%', position:'absolute', zIndex:'-1'}}/>
                                <Button style={{backgroundColor:'#000000b8'}} onClick={updateHandler}>Set as background picture</Button>
                            </div>
                            : <label htmlFor='file' className={classes.setBackgroundImg}>
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    onChange={handleFileInputChange}
                                    value={fileInputState}
                                    style={{display:'none'}}
                                />
                                <div>Set background image</div>
                            </label>
                        : <div className={classes.backgroundImg}>Background image is not set</div>
                    : <img src={backgroundImgUrl} className={classes.backgroundImg} />}
                <Container className={classes.profileTextContainer}>
                    <Container className={classes.profileImgTextContainer}>
                        <img src={user?.profilePic ? imgUrl : '/Images/NoUser.png'} className={classes.leftBarProfilePic}/>
                        <Typography component='p' style={{color:darkMode ? '#fff' : '#000'}}>{user.name}</Typography>
                    </Container>
                    {
                        userInfo?.bio && 
                        <Container className={classes.bio}>
                            {user.bio}
                        </Container>
                    }
                    {userInfo && user && user?._id !== userInfo?.id && <Button className={classes.followButton} onClick={followHandler}>{isFollowed ? 'Unfollow' : 'Follow'}</Button>}
                </Container>
            </Box>
            <div className={classes.profileFeedContainer}>
                <Feed posts={arrangedPosts} user={user}/>
            </div>
        </Layout>
    )
}


// Export
export const getServerSideProps = async context => {
    const {params} = context;
    const {id} = params;

    await dbConnection();
    const user = await User.findById(id);
    const stringifiedUser = JSON.stringify(user);
    const allPosts = await Post.find();
    const userPosts = allPosts.filter(post => post.userId === id);
    const stringifiedPosts = JSON.stringify(userPosts);
    await db.disconnect();

    return {props:{user:JSON.parse(stringifiedUser), posts:JSON.parse(stringifiedPosts)}};
}
export default Profile;