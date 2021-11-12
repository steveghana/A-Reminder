import React, { useState, useEffect } from 'react';
import Posts from "./components/Posts/posts"
import Form from "./components/Form/form"

import {Container, Typography, Grow, Grid, AppBar, Button} from "@material-ui/core"


import { getPostFromServer } from './action/crudAction'
import {useDispatch} from "react-redux"
// import { useSelector } from 'react-redux';
import "./index.css"

function Home() {
    const [currentid, setcurrentid] = useState(null)

    const dispatch = useDispatch()
    useEffect(()=>{
dispatch(getPostFromServer())
    }, [])
    return (



<Grow in>
    <Container>
        <Grid container justifyContent="space-between" alignItems= 'stretch' spacing={3} >
            <Grid item xs={12} sm={7} >
                <Posts setcurrentid= {setcurrentid}/>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Form currentid={currentid} setcurrentid={setcurrentid} />
            </Grid>
        </Grid>
    </Container>
</Grow>
       

)

}

export default Home
