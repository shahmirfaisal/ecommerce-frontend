import { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  Grid,
  Chip,
  Button,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/slices/order";
import { fetchAdminOrders } from "../../../redux/slices/admin";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Loader } from "../../../components/Loader/";

export const Orders = ({ admin }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector((state) =>
    admin ? state.admin.orders : state.orders.orders
  );
  const contentLoading = useSelector((state) =>
    admin ? state.admin.contentLoading : state.orders.contentLoading
  );
  const adminExist = localStorage.getItem("adminToken");
  const userExist = localStorage.getItem("userToken");

  useEffect(() => {
    if (admin && !adminExist) {
      history.replace("/admin/login");
    }
    if (!admin && !userExist) {
      history.replace("/");
    }
  }, [userExist, adminExist]);

  useEffect(() => {
    dispatch(admin ? fetchAdminOrders() : fetchOrders());
  }, []);

  return (
    <Container maxWidth="lg">
      {contentLoading ? (
        <Loader />
      ) : (
        <>
          <Typography className={classes.heading} variant="h3">
            Orders
          </Typography>

          {orders.length ? null : <Typography>No orders.</Typography>}

          <Grid container spacing={4}>
            {orders.map((order) => {
              const items = order?.items?.reduce(
                (total, item) => item.quantity + total,
                0
              );

              return (
                <Grid key={order._id} item md={4} sm={6} xs={12}>
                  <Card className={classes.card}>
                    <Typography>
                      <span>ID</span> <Chip label={order._id} size="small" />
                    </Typography>
                    <Typography>
                      <span>Products</span> {order.items.length}
                    </Typography>
                    <Typography>
                      <span>Items</span> {items}
                    </Typography>
                    <Typography>
                      <span>Date</span> {moment(order.date).fromNow()}
                    </Typography>
                    <Typography>
                      <span>Price</span> ${order.price}
                    </Typography>
                    <Typography>
                      <span>Status</span>{" "}
                      <Chip
                        style={{ color: "white" }}
                        label={order.status}
                        size="small"
                        color="primary"
                      />
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() =>
                        admin
                          ? history.push(`/admin/order/${order._id}`)
                          : history.push(`/order/${order._id}`)
                      }
                    >
                      Details
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
};
