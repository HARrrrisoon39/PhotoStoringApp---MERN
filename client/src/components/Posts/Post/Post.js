import React from "react";
import useStyles from "./style";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { deletePost,likedPost } from "../../../action/posts";
import { useDispatch } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Card className={classes.card} style={{margin:"14px"}}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ color: "white" }}
          >
            {post.title}
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <Button
          onClick={() => setCurrentId(post._id)}
          className={classes.overlay2}
        >
          <MoreHorizIcon />
        </Button>
        <CardContent className={classes.message}>
          <Typography variant="body1" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography>Tags:{post.tags.map((tag) => `#${tag}`)}</Typography>
        </div>
        <div className={classes.cardActions}>
          <CardActions disableSpacing>
            <Button onClick={()=> dispatch(likedPost(post._id))} style={{ color: "blue" }}>
              <FavoriteIcon />{post.likeCount}
            </Button>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ textAlign: "center", color: "black" }}
            >
              Created By:{post.creator}
            </Typography>
            <Button onClick={()=> dispatch(deletePost(post._id))} style={{ color: "red" }} >
              <DeleteIcon />
            </Button>
          </CardActions>
        </div>
      </Card>
    </>
  );
}

export default Post;
