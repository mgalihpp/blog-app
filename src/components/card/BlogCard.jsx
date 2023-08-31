import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import {green} from "@mui/material/colors";
import { useTheme } from "@emotion/react";

const BlogCard = ({ userName, title, description, imageUrl, date }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: "100vw",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: `0px 10px 20px ${theme.palette.secondary.shadow}`,
        cursor: "pointer",
        "@media (min-width: 768px)": {
          maxWidth: "50vw",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        alt="Paella dish"
      />
    </Card>
  );
};

export default BlogCard;
