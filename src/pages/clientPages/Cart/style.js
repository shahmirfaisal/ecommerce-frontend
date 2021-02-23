import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& a:hover": {
      color: theme.palette.primary.main,
    },
  },
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  tableContainer: {
    "& th": {
      fontWeight: "bold",
    },
    "& th, & td, & a": {
      fontSize: "16px",
    },
  },
  btn: {
    marginTop: "20px",
  },
}));
