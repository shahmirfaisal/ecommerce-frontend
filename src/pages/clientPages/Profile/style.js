import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  tableContainer: {
    maxWidth: "500px",
    "& th": {
      fontWeight: "bold",
    },
    "& th, & td": {
      fontSize: "17px",
    },
    // "& tr:nth-child(odd)": {
    //   backgroundColor: "#f1f1f1",
    // },
  },
});
