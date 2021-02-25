import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  textField: {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    "& .MuiFormLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      fontSize: "23px",
    },
    "& label + .MuiInput-formControl": {
      width: "100%",
    },
  },
});
