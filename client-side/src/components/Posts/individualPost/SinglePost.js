import React, { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import {Delete, ThumbUpAlt, ThumbUpAltOutlined} from "@material-ui/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import {useLocation} from 'react-router-dom'
import useStyles from "./styles";
import { likedCount, deletedPost } from "../../../action/crudAction";
function SinglePost({ post, setcurrentid }) {
  const dispatch = useDispatch()
  const initialState = JSON.parse(localStorage.getItem('profile'))
  const [user, setuser] = useState(initialState)
  const data = useSelector((state)=>state.User.authData)
  const classes = useStyles();
const location= useLocation()
  const handlelikes = () => {
    dispatch(likedCount(post._id))
    
  }
  useEffect(()=>{
    setuser(initialState)

  },[data])

  const Likes =()=>{
   if(post.likes > 0){
   return  post.likes.find((like)=> like === user?.result?._id) ? (
<><ThumbUpAlt fontSize="small">{post.likes.length > 2 ? `You and ${post.likes.length - 1} others liked `: `${post.length} Like ${post.length > 1 ? 's' : ''}`}</ThumbUpAlt></>
):(
<><ThumbUpAlt fontSize='small'>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</ThumbUpAlt></>

)
     
   }
   return <> <ThumbUpAltOutlined fontSize="small" /> Like </>
  }
  return (

    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
      {user?.result?.firstName && (
          <>
        <Button style={{ color: 'white' }} size="small" ><MoreHoriz fontSize="medium"
          onClick={() => setcurrentid(post._id)}
        /></Button>
   </>
        )
        }
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {user?.result?.firstName ? (
          <>
            <Button size="small" color="primary" onClick={handlelikes} ><Likes/></Button>
            <Button size="small" color="primary" onClick={() => dispatch(deletedPost(post._id))} ><Delete fontSize="small" /> Delete</Button>
          </>
        ): null
        }
      </CardActions>
    </Card>
  );
}

export default SinglePost;
