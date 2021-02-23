import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/slices/product";

export const AddReview = ({ order }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const loading = useSelector((state) => state.products.buttonLoading);
  const dispatch = useDispatch();

  const changeRatingHandler = (e, value) => setRating(value);
  const changeCommentHandler = (e) => setComment(e.target.value);
  const submitHandler = () => {
    dispatch(addReview({ id: productId, order, rating, comment }));
  };

  useEffect(() => {
    setOpen(true);
    return () => setOpen(false);
  }, []);

  const handleClose = () => {
    history.goBack();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your honest review on this product!
        </DialogContentText>

        <Rating value={rating} onChange={changeRatingHandler} precision={0.1} />

        <Typography component="span" className={classes.ratingText}>
          {rating} stars
        </Typography>

        <TextField
          value={comment}
          margin="dense"
          id="name"
          label="Comment"
          fullWidth
          onChange={changeCommentHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submitHandler}
          color="primary"
          endIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Add Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};
