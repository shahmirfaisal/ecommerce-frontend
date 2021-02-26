import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

export const Payment = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Josefin Sans, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <section>
      <Typography>
        This is just a demo website, so use this card for a demo purchase.
      </Typography>

      <Card className={classes.demoCard}>
        <CardContent>
          <Typography>Card Number:</Typography>
          <Typography>4242 4242 4242 4242</Typography>
          <Typography>Expiry Date:</Typography>
          <Typography>11 / 22</Typography>
          <Typography>CVC:</Typography>
          <Typography>123</Typography>
        </CardContent>
      </Card>

      <form className={classes.cardForm} onSubmit={props.paymentHandler}>
        <div className={classes.card}>
          <CardElement options={cardStyle} />
        </div>
        <Button
          disabled={props.processing}
          type="submit"
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          endIcon={props.processing ? <CircularProgress size={20} /> : null}
        >
          Pay ${user?.cart?.price}
        </Button>
      </form>
    </section>
  );
};
