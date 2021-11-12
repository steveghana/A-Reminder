import React from 'react'
import SinglePosts from "./individualPost/SinglePost"
import useStyles from "./styles"
import { CircularProgress,Grid } from '@material-ui/core'
import {useSelector} from 'react-redux'
function Posts({setcurrentid}) {
 const posts = useSelector((state)=> state.post)
 console.log(posts);
    const classes = useStyles()
    return (
!posts.length ? <CircularProgress/> : (
<Grid  className= {classes.mainContainer}  container alignItems="stretch" spacing={3} >
    {
        posts.map(post=>(
<Grid key = {post._id} item xs={12} sm={6} >
    <SinglePosts post = {post} setcurrentid={setcurrentid}/>
</Grid>
        ))
    }

</Grid>
)

        )
}

export default Posts
