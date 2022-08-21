// Imports
import axios from 'axios'
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import {Store} from '../Utils/Store'
import {useSnackbar} from 'notistack'
import {useRouter} from 'next/router'
import useStyles from '../styles/Styles'
import Layout from '../Components/Layout'
import {useContext, useEffect} from 'react'
import {CircularProgress} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {List, ListItem, TextField, Typography, Button, Link} from '@material-ui/core'


// Main Function
const Register = () => {

  const classes = useStyles();
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {userInfo, loading} = state;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const {handleSubmit, control, formState:{errors}} = useForm();
  const submitHandler = async ({name, email, password, confirmPassword}) => {
    closeSnackbar();
    dispatch({type:'USER_LOGIN_START'})
    try {
      const {data} = await axios.post('/api/users/register', {name, email, password, confirmPassword});
      if(password === confirmPassword){
        Cookies.set('userInfo', JSON.stringify(data));
        dispatch({type:'USER_LOGIN_SUCCESS', payload:data});
        router.push('/info');
        enqueueSnackbar(`Welcome ${data.name.split(' ')[0]}`, {variant:'success'});
      }else{
        enqueueSnackbar('Passwords dont match', {variant:'error'});
        return;
      }
    } catch (err) {
      dispatch({type:'USER_LOGIN_FAIL'});
      enqueueSnackbar(err?.response?.data?.message, {variant:'error'});
      console.log(err);
    }
  }
  useEffect(() => {
    userInfo && router.push('/');
  }, []);

  return (
    <div>
        <Layout title='Register'>
          <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
              <Typography component='h1' variant='h1' style={{marginLeft:'15px'}}>Register</Typography>
              <List>
                <ListItem>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    rules={{
                      required:true,
                      maxLength:25
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='name'
                        label='Full Name'
                        inputProps={{type:'text'}}
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errors.name.type === 'maxLength' ? 'Name cannot exceed 25 characters' : 'Name is required' : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                <ListItem>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                      required:true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='email'
                        label='Email'
                        inputProps={{type:'email'}}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.type === 'pattern' ? 'Email is not valid' : 'Email is required' : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                <ListItem>
                  <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                      required:true,
                      minLength:6
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='password'
                        label='Password'
                        inputProps={{type:'password'}}
                        error={Boolean(errors.password)}
                        helperText={errors.password ? errors.password.type === 'minLength' ? 'Password must contain at least 6 characters' : 'Password is required' : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                <ListItem>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    defaultValue=''
                    rules={{
                      required:true,
                      minLength:6
                    }}
                    render={({field}) => (
                      <TextField 
                        variant='outlined'
                        fullWidth
                        id='confirmPassword'
                        label='Confirm Password'
                        inputProps={{type:'password'}}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword ? errors.confirmPassword.type === 'minLength' ? 'Password must contain at least 6 characters' : 'Password is required' : ''}
                        {...field}/>
                    )}/>
                </ListItem>
                <ListItem>
                  <Button color='primary' variant='contained' type='submit' fullWidth>{loading ? <CircularProgress style={{color:'#fff', margin:'5px 0'}}/> : 'Register'}</Button>
                </ListItem>
                <ListItem>
                  Already have an account? &nbsp;
                  <NextLink href='/login' passHref>
                    <Link>
                      Login
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
export default Register;