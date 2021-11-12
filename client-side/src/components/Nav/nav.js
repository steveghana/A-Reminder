import React, {useState, useEffect} from 'react'
import { AppBar,Avatar, Typography, Button, Toolbar } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { Link,useHistory, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png'
import { logout } from '../../action/auth'
function Nav() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()
    const handlelogout=()=>{
        setuser(null)
        dispatch(logout())
    }
    useEffect(()=>{
        // const token = user?.token
        
        setuser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className="classes brandcontainer">
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />

            </div>
            <Toolbar className={classes.Toolbar}>
                {
                    user ? (
                        <>
                        <Avatar className={classes.avatar} alt={user.result.firstName} src={user.result.ImageUR}></Avatar>
                        <Typography>{`${user?.result?.firstName} ${user?.result?.secondName}`}</Typography>
                        <Button variant='contained' color= 'primary' onClick={handlelogout} >Logout</Button>
                        </>
                    ) : (
                  
                        <Button component={Link} to="/auth"  variant='contained' color='secondary'>Sign in</Button>
                    )
                }
            </Toolbar>

        </AppBar>
    )
}

export default Nav
