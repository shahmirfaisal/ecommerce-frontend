import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    "& > *": {
      marginBottom: "20px",
    },
    "& .MuiFormLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      fontSize: "23px",
    },
  },
});
