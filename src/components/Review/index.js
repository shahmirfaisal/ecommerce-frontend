import { Paper, Avatar, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {} from "@material-ui/icons";
import { useStyles } from "./style";

export const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.review}>
      <header className={classes.reviewHeader}>
        <Avatar>{review.user.name[0]}</Avatar>
        <Typography>{review.user.name}</Typography>
      </header>
      <div className={classes.rating}>
        <Rating precision="0.1" value={review.rating} readOnly size="small" />
        <Typography>{review.rating}</Typography>
      </div>
      <Typography className={classes.comment}>{review.comment}</Typography>
    </Paper>
  );
};
