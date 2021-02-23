import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  input: {
    margin: "0 auto 50px auto",
    width: "100%",
    maxWidth: "400px",
    "& .MuiInputBase-input": {
      fontSize: "20px",
    },
  },
});
