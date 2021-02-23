import { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const Payment = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  // const [disabled, setDisabled] = useState(true);

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
          Pay Now
        </Button>
      </form>
    </section>
  );
};
