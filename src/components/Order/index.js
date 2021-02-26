import {} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";

export const Order = ({ order }) => {
  const classes = useStyles();
  const items = order?.items?.reduce((total, item) => item.quantity + total, 0);

  return (
    <Card className={classes.card}>
      <Typography>
        <span>Order ID</span> <Chip label={order._id} size="small" />
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
        onClick={() => push(`/order/${order._id}`)}
      >
        Details
      </Button>
    </Card>
  );
};
