import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  DeleteOutlineOutlined,
  AddOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decrementFromCart,
  deleteFromCart,
} from "../../../redux/slices/user";
import { withUserAuth } from "../../../hoc/withUserAuth";

export const Cart = withUserAuth(true)((props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.cartLoading);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography className={classes.heading} variant="h3">
        Cart
      </Typography>

      {!user?.cart?.price ? (
        <>
          <Typography>
            You haven't added any product to the cart yet!
          </Typography>
          <Typography component={Link} to="/shop">
            Go and do some shopping!
          </Typography>
        </>
      ) : (
        <>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {user?.cart?.items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Typography
                        component={Link}
                        to={`/product/${item.product._id}`}
                      >
                        {item.product.name}
                      </Typography>
                    </TableCell>
                    <TableCell>${item.product.price}</TableCell>
                    <TableCell style={{ minWidth: "150px" }}>
                      {loading ? (
                        <CircularProgress size={35} />
                      ) : (
                        <>
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(addToCart(item.product._id))
                            }
                          >
                            <AddOutlined />
                          </IconButton>{" "}
                          {item.quantity}{" "}
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(decrementFromCart(item.product._id))
                            }
                          >
                            <RemoveOutlined />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                    <TableCell>${item.quantity * item.product.price}</TableCell>
                    <TableCell>
                      {loading ? (
                        <CircularProgress size={35} />
                      ) : (
                        <IconButton
                          onClick={() =>
                            dispatch(deleteFromCart(item.product._id))
                          }
                        >
                          <DeleteOutlineOutlined />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th">
                    Subtotal: ${user?.cart?.price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            className={classes.btn}
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/checkout"
          >
            Proceed to checkout
          </Button>
        </>
      )}
    </Container>
  );
});
