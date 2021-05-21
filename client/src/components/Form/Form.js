import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Button, Paper, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../action/posts";
import FileBase from "react-file-base64";

function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("user"))?.result?.name;

  useEffect(() => {
    if (posts) {
      return setPostData(posts);
    }
  }, [posts]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user }));
    } else {
      dispatch(createPost({ ...postData, name: user }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user) {
    return (
      <>
        <h1>Sign In</h1>
      </>
    );
  }

  return (
    <>
      <Paper className={`${classes.root} ${classes.paper}`}>
        <form
          autoComplete="off"
          noValidate
          onSubmit={submitHandler}
          className={classes.form}
        >
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            variant="outlined"
          ></TextField>
          <TextField
            name="message"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            variant="outlined"
          ></TextField>
          <TextField
            name="tags"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            variant="outlined"
          ></TextField>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            ></FileBase>
          </div>
          <Button
            variant="contained"
            className={classes.buttonSubmit}
            size="large"
            type="submit"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            className={classes.buttonSubmit}
            size="large"
            color="secondary"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default Form;
