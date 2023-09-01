import { useTheme } from "@emotion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

const SkeletonCard = () => {
  const theme = useTheme();

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
        avatar={<Skeleton animation='wave' variant="circular" width={40} height={40} />}
        title={<Skeleton animation='wave' variant="text" width={"100%"} height={30} />}
        subheader={<Skeleton animation='wave' variant="text" width={"100%"} height={30} />}
      />
      <CardMedia>
          {<Skeleton animation='wave' variant="text" width={'100%'} height={100} />}
        <Skeleton animation='wave' variant="rounded" width={"100%"} height={"300px"} />
      </CardMedia>
    </Card>
  );
};

export default SkeletonCard;
