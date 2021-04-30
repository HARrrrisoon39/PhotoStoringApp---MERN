import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memory from "./components/images/memory.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./action/posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  },[dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Typography variant="h2" align="center">
            Photos
          </Typography>
          <img
            src={memory}
            alt="memory"
            height="60"
            style={{ marginLeft: "10px" }}
          />
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              className={classes.mainContainer}
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;
