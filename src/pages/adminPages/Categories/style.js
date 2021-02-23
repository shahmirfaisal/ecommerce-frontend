import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  container: {
    maxWidth: "600px",
  },
  tableContainer: {
    marginTop: "30px",
    "& th": {
      fontWeight: "bold",
    },
    "& th, & td": {
      fontSize: "16px",
    },
  },
});
