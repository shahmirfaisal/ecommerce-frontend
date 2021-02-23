import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    marginTop: "100px",
    "& th": {
      fontWeight: "bold",
    },
  },
  img: {
    width: "100%",
    maxWidth: "500px",
    "& > img": {
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  heading: {
    marginBottom: "10px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      color: "#8e8e8e",
      marginLeft: "10px",
    },
  },
  price: {
    margin: "14px 0",
  },
  badge: {
    marginTop: "20px",
  },
  tableContainer: {
    maxWidth: "600px",
    margin: "50px 0 50px 0",
    "& th, & td": {
      fontSize: "17px",
    },
    "& thead tr": {
      backgroundColor: "#f1f1f1",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#f1f1f1",
    },
  },
});

export const BigTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 15,
  },
}))(Tooltip);
