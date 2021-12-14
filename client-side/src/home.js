import React, { useState, useEffect } from "react";
import Posts from "./components/Posts/posts";
import Form from "./components/Form/form";
import "./index.css";

import {
  Container,
  Typography,
  Grow,
  Grid,
  AppBar,
  Button,
} from "@material-ui/core";

import { getPostFromServer } from "./action/crudAction";
import { useDispatch } from "react-redux";
// import { useSelector } from 'react-redux';

function Home() {
  const [currentid, setcurrentid] = useState(null);
  const [openinput, setopeninput] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostFromServer());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12}>
            <Posts setopeninput={setopeninput} setcurrentid={setcurrentid} />
          </Grid>
          <Grid item xs={12}>
            <Form
              openinput={openinput}
              setopeninput={setopeninput}
              currentid={currentid}
              setcurrentid={setcurrentid}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
