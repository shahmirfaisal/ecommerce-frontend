import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  textField: {
    display: "block",
    "& > div": {
      width: "100%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "450px",
    padding: "15px",
    "& button": {
      margin: "15px 0",
    },
  },
});
