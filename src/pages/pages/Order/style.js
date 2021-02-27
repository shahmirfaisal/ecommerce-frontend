import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  paper: {
    padding: "20px",
    "& p > span": {
      fontWeight: 700,
    },
    "& > h6": {
      fontWeight: 700,
      marginBottom: "15px",
    },
    "& > p:not(:last-child)": {
      marginBottom: "10px",
    },
  },
  product: {
    "& p > span": {
      fontWeight: 700,
    },
  },
  productName: {
    fontWeight: 700,
    paddingBottom: "15px",
    whiteSpace: "nowrap",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
