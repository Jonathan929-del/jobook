// Imports
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import {useSnackbar} from 'notistack'
import {useRouter} from 'next/router'
import useStyles from '../styles/Styles'
import Layout from '../Components/Layout'
import {useContext, useEffect, useState} from 'react'
import {CircularProgress} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {List, ListItem, TextField, Typography, Button, Link} from '@material-ui/core'


// Main Function
const Login = () => {


  // Variables
  const classes = useStyles();
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {userInfo, loading} = state;
  const [imgError, setImgError] = useState(false);
  const [img, setImg] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const {handleSubmit, control, formState:{errors}} = useForm();


  // Image Handlers
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
    setImg(`profilePic-${userInfo.id}`);
    setImgError();
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
    } catch (err) {
        setImgError(true);
        console.error(err);
    }
  };


  // Submit Handler
  const submitHandler = async ({bio, country}) => {
    closeSnackbar();
    dispatch({type:'USER_LOGIN_START'});

    // Image Uploading
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
      if(imgError){
        enqueueSnackbar('Img is too large', {variant:'error'});
        return;
      }else{
        const {data} = await axios.put(`/api/users/update/${userInfo.id}`, {bio, country, profilePic:img}, {headers:{authorization:`Bearer ${userInfo.token}`}});
        Cookies.set('userInfo', JSON.stringify(data));
        dispatch({type:'USER_LOGIN_SUCCESS', payload:data});
        router.push('/');
      }
    } catch (err) {
      dispatch({type:'USER_LOGIN_FAIL'});
      enqueueSnackbar(err.response.data.message, {variant:'error'});
    }
  }
  
  return (
    <div style={{marginTop:'80px'}}>
        <Layout title='Info'>
          <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
              <Typography component='h1' variant='h1' style={{marginLeft:'15px'}}>Tell us more about you</Typography>
              <List>
                <ListItem>
                  <Controller
                    name='bio'
                    control={control}
                    defaultValue=''
                    rules={{
                      maxLength:200
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='bio'
                        label='Bio'
                        inputProps={{type:'text'}}
                        error={Boolean(errors.bio)}
                        helperText={errors.bio ? 'Bio cant exceed 200 characters' : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                <ListItem>
                  <Controller
                    name='country'
                    control={control}
                    defaultValue=''
                    rules={{
                      maxLength:20
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='country'
                        label='country'
                        inputProps={{type:'text'}}
                        error={Boolean(errors.country)}
                        helperText={errors.country ? 'Country cant exceed 20 characters'  : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                {previewSource ? (
                  <ListItem>
                    <Image src={previewSource} height={100} width={100} alt='Selected Image' className={classes.profilePic}/>
                  </ListItem>
                ):(
                  <ListItem>
                    <div className={classes.container}>
                      <label htmlFor='file'>
                        <input
                          id="file"
                          type="file"
                          name="file"
                          onChange={handleFileInputChange}
                          value={fileInputState}
                          style={{display:'none'}}
                        />
                        <div className={classes.layer}>Set Profile Picture</div>
                        <Image src='/Images/NoUser.png' height={100} width={100} alt='Selected Image' className={classes.noProfilePic}/>
                      </label>
                    </div>
                  </ListItem>
                )}
                <ListItem>
                  <Button color='primary' variant='contained' type='submit' fullWidth>{loading ? <CircularProgress style={{color:'#fff', margin:'5px 0'}}/> : 'Proceed'}</Button>
                </ListItem>
                <ListItem>
                  <NextLink href='/' passHref>
                    <Link>
                      Skip
                    </Link>
                  </NextLink>
                </ListItem>
              </List>
          </form>
        </Layout>
    </div>
  )
}


// Export
export default Login;