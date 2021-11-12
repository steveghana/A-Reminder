import React, {useState, useEffect} from 'react'
import { Container,Avatar, Grid, Typography, TextField, Paper, Button, Icon } from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import useStyles from './style'
import GoogleLogin from 'react-google-login'
import Input from './input'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import { signin,signup } from '../../action/auth'
function Auth() {
    const data = useSelector((state)=>state.User)
    // const isSignedup = false
    const [isSignedup, setisSignedup] = useState(false)
    const [showpassword, setshowpassword] = useState(false)
    const [errorhandle, seterrorhandle] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        firstName:"",
         secondName:"",
         email:"",
         password:"", 
         confirmpassword : ""
     }
    const [user, setuser] = useState(initialState)
    const classes = useStyles()
    const handleSubmit = (e)=>{
e.preventDefault()
if(isSignedup) {
    dispatch(signup(user, history, seterrorhandle))
    
}else{
    dispatch(signin(user, history, seterrorhandle))
    console.log('yes i did')
}


    }
    const handleChange = (e)=>{
        setuser({...user,[e.target.name] : e.target.value})
        
    }
    const switchmode=()=>{
        setisSignedup((preveisSignedup)=> !preveisSignedup)
        setshowpassword(false)
        seterrorhandle(null)
        setuser(initialState)
    }
    const googleSucess= (res)=>{
// console.log(res)
    }
    const googleFailure= ()=>{
// console.log('failed to login, please try again later')
    }
    useEffect(()=>{
console.log(data)
    },[data])
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.Paper} elevation={3} style={{marginTop: "2rem", padding : "2rem" }}>
               <Avatar className={classes.Avatar}>
                   <LockOutlined/>

               </Avatar>
               <Typography variant="h5">{isSignedup ? "Sign up" : "Sign in"}</Typography>
<form autoComplete="off" noValidate onSubmit={handleSubmit} className={classes.form}>
    <Grid container spacing={2} style={{marginTop: "1rem"}} >
        {
            isSignedup && (
                <>
                <Input label="First name" name="firstName" placeholder="First name" autoFocus half handleChange={handleChange} />
                <Input label="Second name" name="secondName" placeholder="Second name"  half  handleChange={handleChange} />
                </>
            )
        }

        <Input label="Email" name="email" type="email"  placeholder="Email"  handleChange={handleChange} />
        <Input label="Password" type={showpassword ? "text" : "password"} name="password" placeholder="password" handleChange={handleChange} />
        {
            isSignedup && ( 
                <>
                <Input label="Confirm Password" name="confirmpassword" type="password" placeholder="Confirm password"  handleChange={handleChange} />
                </>
            )
        }
{
    errorhandle && (
        <Typography color="secondary" variant="subtitle1">{errorhandle}</Typography>

    )
}
        <Button style={{marginTop: "1rem"}} fullWidth variant="contained" color="primary" type="submit" >{isSignedup ? "Sign up" : "Sign in"}</Button>
<GoogleLogin
clientId="Google id"
render={(renderprops)=>(
    <Button className={classes.googleButton} fullWidth color="primary" variant="contained" onClick={renderprops.onClick} disabled={renderprops.disabled} startIcon={<Icon/>}>Goggle Sign In</Button>
)}
onSuccess={googleSucess}
onFailure={googleFailure}
cookiePolicy="single_host_origin"
/>
        <Grid container >
            <Grid item>
                <Button onClick={switchmode}>
                    {isSignedup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                </Button>
            </Grid>
        </Grid>
    </Grid>
</form>
           </Paper>

       </Container>
    )
}

export default Auth
