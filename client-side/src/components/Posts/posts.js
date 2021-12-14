import React from "react";
import SinglePosts from "./individualPost/SinglePost";
import "./styles.css";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
function Posts({ setcurrentid, setopeninput }) {
  const posts = useSelector((state) => state.post);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className="mainContainer" container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} lg={6} item xs={12} sm={6}>
          <SinglePosts
            setopeninput={setopeninput}
            post={post}
            setcurrentid={setcurrentid}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
