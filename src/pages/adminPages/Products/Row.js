import { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
  Typography,
  IconButton,
  Box,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  EditOutlined,
  DeleteOutlineOutlined,
} from "@material-ui/icons";
import { useStyles } from "./style";
import moment from "moment";
import { Reviews } from "./Reviews";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../redux/slices/admin";

export const Row = ({ product }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.authLoading);
  const [openReviews, setOpenReviews] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpenReviews(false);
  const handleOpen = () => setOpenReviews(true);

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <>
      <TableRow key={product._id} className={classes.row}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className={classes.img}>
            <img src={product.image} />
          </div>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{product.sold}</TableCell>
        <TableCell>{product.status}</TableCell>
        <TableCell>
          {loading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <>
              <IconButton
                onClick={() => push(`/admin/edit-product/${product._id}`)}
                color="primary"
                size="small"
                style={{ marginRight: "10px" }}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                color="secondary"
                size="small"
                onClick={deleteProductHandler}
              >
                <DeleteOutlineOutlined />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginTop={2} paddingBottom={2}>
              <Typography variant="h5">More Detail</Typography>
              <Table
                size="small"
                style={{ marginTop: "10px" }}
                component={Paper}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Reviews</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{moment(product.created).fromNow()}</TableCell>
                  <TableCell>
                    {product.rating?.toFixed(1) || "No rating"}
                  </TableCell>
                  <TableCell>{product.reviews.length}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ color: "white" }}
                      onClick={handleOpen}
                    >
                      View Reviews
                    </Button>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Reviews
        open={openReviews}
        onClose={handleClose}
        reviews={product.reviews}
      />
    </>
  );
};
