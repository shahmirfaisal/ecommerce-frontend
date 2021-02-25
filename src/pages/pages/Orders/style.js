import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  card: {
    padding: "15px",
    "& p": {
      marginBottom: "10px",
    },
    "& > p > span:first-child": {
      fontWeight: 700,
    },
  },
});
