import React,{ useState, useEffect, useRef } from "react"
import useStyles from "./styles"
import FileBase from "react-file-base64"
import {createPostToServer} from '../../action/crudAction'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import {Typography, TextField, Button, Paper} from "@material-ui/core"
import { updatedPost } from "../../action/crudAction"
function Form({currentid, setcurrentid}) {
const dispatch = useDispatch()  
const data = useSelector((state)=>state.User.authData)
const location = useLocation()
const initialState= JSON.parse(localStorage.getItem('profile')) 
const [user, setuser] = useState(initialState)
const updatePost = useSelector((state)=> currentid ? state.post.find((p)  => p._id === currentid) : null)
const [post, setPostInfo] = useState({
    title : "", 
    message : '',
    tags : '', 
    selectedFile : ""
})
const classes = useStyles()
const handleSubmit = (e) =>{
e.preventDefault()
if(currentid){
    dispatch(updatedPost(currentid,{...post, name :  user?.result?.name}))
}else{
    dispatch(createPostToServer({...post, name :  user?.result?.name}))

}
clear()
}
const clear = () =>{
setPostInfo({
    title : "", 
    message : '',
    tags : '', 
    selectedFile : ""

})
setcurrentid(null)    
}
useEffect(()=>{
    if(updatePost) setPostInfo(updatePost);
    setuser(initialState)

}, [currentid,updatePost,data])




if(!user?.result?.firstName){
    return(
        <Paper className={classes.paper}>
            <Typography>
                Please log in to create,update, like and delete memories
            </Typography>

        </Paper>
    )
}
    return ( 
          <Paper className= {classes.paper}>
<form autoComplete= "off" noValidate className = {classes.form} onSubmit= {handleSubmit} >
<Typography variant= 'h6'>Creating a memory</Typography>
<TextField name= 'title' variant="outlined" label= "Title" fullWidth value={post.title} onChange={(e)=> setPostInfo({...post, title: e.target.value })} />
<TextField name= 'message' variant="outlined" label= "Message" fullWidth value={post.message} onChange={(e)=> setPostInfo({...post, message: e.target.value })} />
<TextField name= 'tags' variant="outlined" label= "Tags" fullWidth value={post.tags} onChange={(e)=> setPostInfo({...post, tags: e.target.value })} />
<div className={classes.fileInput}>
<FileBase
type = "file"
multiple={false}
onDone = {({base64})=>setPostInfo({...post, selectedFile : base64})}
/>
</div>
<Button className = { classes.buttonSubmit} variant = "contained" color= 'primary' size="large" type='submit' fullWidth>Submit</Button>
<Button  variant = "contained" color= 'secondary' size="small" fullWidth>Clear</Button>
</form>
          </Paper>
    )
}

export default Form
