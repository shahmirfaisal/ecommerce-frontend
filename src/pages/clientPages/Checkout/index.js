import { useState, useEffect } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { Payment } from "./Payment";
import { Shipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../../../redux/slices/order";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { NotificationManager } from "react-notifications";
import { UserAxios } from "../../../api/instances";
import * as Api from "../../../api/endpoints";
import { useHistory } from "react-router-dom";
import { emptyCart } from "../../../redux/slices/user";
import { withUserAuth } from "../../../hoc/withUserAuth";
import { Loader } from "../../../components/Loader/";

const stripePromise = loadStripe(
  "pk_test_51HY7L7IuPlgS5Yt8yUJxodsQVLzRImwyhBycWSTi4njwihcuahtqN2dUAAwaYDG2ZlErSFZ2eFHwM18uYlIRVKvF00BK4ecBy6"
);

const getSteps = () => ["Shipping Address", "Payment Info"];

const Checkout = withUserAuth(true)((props) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const contentLoading = useSelector((state) => state.orders.contentLoading);
  const clientSecret = useSelector((state) => state.orders.clientSecret);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    dispatch(createPaymentIntent());
  }, []);

  const changeCountryHandler = (e) => setCountry(e.target.value);
  const changeCityHandler = (e) => setCity(e.target.value);
  const changeAddress1Handler = (e) => setAddress1(e.target.value);
  const changeAddress2Handler = (e) => setAddress2(e.target.value);
  const changeZipCodeHandler = (e) => {
    if (isNaN(Number(e.target.value))) return;
    setZipCode(e.target.value.trim());
  };

  const isStepSkipped = (step) => skipped.has(step);

  const nextStepHandler = () => {
    const newSkipped = [...skipped.values(), activeStep];
    setSkipped(new Set([...newSkipped]));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setProcessing(false);
        return NotificationManager.error(payload.error.message);
      }
      const res = await UserAxios.post(Api.CREATE_ORDER, {
        country,
        city,
        address1,
        address2,
        zipCode,
      });

      dispatch(emptyCart());

      NotificationManager.success("Order placed!");

      history.replace("/");
      setProcessing(false);
    } catch (error) {
      NotificationManager.error(error.message);
    }
    setProcessing(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Shipping
            country={country}
            city={city}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
            changeCountryHandler={changeCountryHandler}
            changeCityHandler={changeCityHandler}
            changeAddress1Handler={changeAddress1Handler}
            changeAddress2Handler={changeAddress2Handler}
            changeZipCodeHandler={changeZipCodeHandler}
            nextStepHandler={nextStepHandler}
          />
        );
      case 1:
        return (
          <Payment paymentHandler={paymentHandler} processing={processing} />
        );
      default:
        return <p>No Content</p>;
    }
  };

  return (
    <Container maxWidth="lg">
      {contentLoading ? (
        <Loader />
      ) : (
        <>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label, index) => {
              let stepProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = true;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {getStepContent(activeStep)}
        </>
      )}
    </Container>
  );
});

const Component = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

export { Component as Checkout };
