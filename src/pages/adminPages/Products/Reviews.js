import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { Review } from "../../../components/Review/";

export const Reviews = ({ reviews, open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog className={classes.reviewsDialog} open={open} onClose={onClose}>
      <DialogTitle>Reviews ({reviews.length})</DialogTitle>
      <DialogContent>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </DialogContent>
    </Dialog>
  );
};
