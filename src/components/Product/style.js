import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    maxWidth: "400px",
  },
  category: {
    color: "rgb(162 162 162)",
    display: "block",
  },
  name: {
    fontWeight: 600,
    marginBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
  },
  price: {
    color: "#FCB941",
    fontSize: "20px",
  },
  reviews: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginTop: "7px",
      color: "rgb(162 162 162)",
      marginLeft: "10px",
    },
  },
  actions: {
    borderTop: "0.5px solid #e4e4e4",
  },
  media: {
    backgroundSize: "contain",
  },
});
