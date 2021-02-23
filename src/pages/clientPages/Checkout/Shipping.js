import { TextField, Button } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { NotificationManager } from "react-notifications";

export const Shipping = (props) => {
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!props.country.trim().length) {
      NotificationManager.error("Enter country!");
      return;
    }
    if (!props.city.trim().length) {
      NotificationManager.error("Enter City!");
      return;
    }
    if (!props.address1.trim().length) {
      NotificationManager.error("Enter Address Line 1!");
      return;
    }
    if (!props.address2.trim().length) {
      NotificationManager.error("Enter Address Line 2!");
      return;
    }
    if (props.zipCode.length !== 5) {
      NotificationManager.error("Invalid Zip Code!");
      return;
    }
    props.nextStepHandler();
  };

  return (
    <section>
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          value={props.country}
          onChange={props.changeCountryHandler}
          label="Country"
        />
        <TextField
          value={props.city}
          onChange={props.changeCityHandler}
          label="City"
        />
        <TextField
          value={props.address1}
          onChange={props.changeAddress1Handler}
          label="Address Line 1"
        />
        <TextField
          value={props.address2}
          onChange={props.changeAddress2Handler}
          label="Address Line 2"
        />
        <TextField
          value={props.zipCode}
          onChange={props.changeZipCodeHandler}
          label="Zip Code"
          InputProps={{ inputProps: { maxlength: "5" } }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ color: "white" }}
        >
          Next
        </Button>
      </form>
    </section>
  );
};
