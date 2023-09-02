import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import BlogDetail from "../BlogDetail";
import axios from "axios";
import { BASE_URL } from "../../config";

const BlogCard = ({
  userName,
  title,
  description,
  imageUrl,
  userId,
  avatar,
  blogId,
  handle,
}) => {
  const theme = useTheme();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(BASE_URL + `/api/blog/delete/${blogId}`);
      const data = await res.data;
      handle();
      alert("blog deleted");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  return (
    <Card
      sx={{
        maxWidth: "100vw",
        margin: "auto",
        padding: 2,
        border: 0.1,
        borderColor: theme.palette.action.disabled,
        boxShadow: `0px 10px 20px ${theme.palette.secondary.shadow}`,
        cursor: "pointer",
        "@media (min-width: 768px)": {
          maxWidth: "50vw",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatar} alt="user avatar"/>
        }
        action={
          showMenu && userId ? (
            <>
              <Box sx={{ display: "flex" }}>
                <IconButton onClick={handleEdit}>
                  <Edit />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="settings" onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={userName}
        subheader={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          maxHeight: 500,
          objectFit: "fill",
          borderRadius: 5,
        }}
        image={imageUrl}
        alt="user image"
      />
      <BlogDetail
        id={blogId}
        handleOpen={showEdit}
        handleWhileSubmit={setShowEdit}
        handleClose={handleCloseEdit}
        handle={handle}
      />
    </Card>
  );
};

export default BlogCard;
