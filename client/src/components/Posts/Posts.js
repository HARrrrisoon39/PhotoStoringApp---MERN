import React from "react";
import Post from "./Post/Post";
import useStyles from "./style";
import {  Container, Grid, LinearProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

function Posts({ currentId, setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const classes = useStyles();

  return !posts.length ? (
    <Container maxWidth="md" style={{marginTop:"300px"}}>
      <Typography style={{textAlign:"center"}} variant="p">Fetching Api</Typography>
      <LinearProgress style={{color:"blue"}}/>
    </Container>
  ) : (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="stretch"
        className={classes.mainContainer}
        spacing={3}
        style={{ marginTop: "7px" }}
      >
        <Grid item xs={12} sm={12}>
          {posts.map((post) => (
            <Post post={post} key={post._id} setCurrentId={setCurrentId} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Posts;
