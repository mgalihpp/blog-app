import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CommentBox from "./CommentBox";
import { formatRelativeTime } from "../../utils/formatDate";
import { useTheme } from "@emotion/react";

const Comment = ({ blogId, comments, handler }) => {
  const theme = useTheme();

  return (
    <div style={{ padding: 14 }}>
      <h1 style={{ textAlign: "center" }}>Comments</h1>
      <CommentBox blogId={blogId} handler={handler} />
      <Paper style={{ padding: "40px 20px" }}>
        {comments.map((comment) => (
          <div key={comment._id}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="" src={comment.userId.avatar} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography
                  variant="body1"
                  sx={{ margin: 0, textAlign: "left" }}
                >
                  {comment.userId.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{marginY: 1, textAlign: "left", color: theme.palette.primary.text }}
                >
                  {comment.text}
                </Typography>
                <p style={{ textAlign: "left", color: "gray" }}>
                  {formatRelativeTime(comment.createdAt)}
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default Comment;
