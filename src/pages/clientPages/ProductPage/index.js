import { useEffect } from "react";
import { useStyles, BigTooltip } from "./style";
import {
  Container,
  Grid,
  Typography,
  Button,
  Badge,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../redux/slices/product";
import moment from "moment";
import { addToCart } from "../../../redux/slices/user";
import { Review } from "../../../components/Review/";
import { Loader } from "../../../components/Loader/";

export const ProductPage = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const cartLoading = useSelector((state) => state.users.cartLoading);
  const loading = useSelector((state) => state.products.loading);
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>
      {loading || !product ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <div className={classes.img}>
                <img src={product.image} />
              </div>
            </Grid>

            <Grid item md={6} xs={12}>
              <Typography variant="h3" className={classes.heading}>
                {product.name}
              </Typography>

              <BigTooltip
                title={`${product.rating?.toFixed(1) || "No"} Rating`}
                placement="top-start"
                arrow
              >
                <div className={classes.rating}>
                  <Rating precision="0.1" value={product.rating} readOnly />
                  <Typography>({product.reviews.length} Reviews)</Typography>
                </div>
              </BigTooltip>

              <Typography
                variant="h5"
                color="primary"
                className={classes.price}
              >
                ${product.price}
              </Typography>
              <Typography>{product.description}</Typography>
              <Badge
                badgeContent="Out of stock"
                color="primary"
                className={classes.badge}
                invisible={product.quantity}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={!product.quantity || cartLoading}
                  onClick={() => dispatch(addToCart(product._id))}
                  endIcon={
                    cartLoading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : null
                  }
                >
                  Add to cart
                </Button>
              </Badge>
            </Grid>
          </Grid>

          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Details</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell component="th">Category</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Created</TableCell>
                  <TableCell>{moment(product.created).fromNow()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Quantity in stock</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Sold</TableCell>
                  <TableCell>{product.sold}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5">
            Reviews ({product.reviews.length})
          </Typography>
          {product.reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </>
      )}
    </Container>
  );
};
