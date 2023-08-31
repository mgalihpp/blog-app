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
import { red } from "@mui/material/colors";

const BlogCard = ({ userName, title, description, imageUrl, date }) => {
  return (
    <Card
      sx={{
        maxWidth: "100vw",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 5px #ccc",
        cursor: "pointer",
        "@media (min-width: 768px)": {
          maxWidth: "50vw",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
        sx={{width: '100%', height: 'auto', maxWidth: "100%", maxHeight: 500, objectFit: 'fill', borderRadius: 5 }}
        image={imageUrl}
        alt="Paella dish"
      />
    </Card>
  );
};

export default BlogCard;
