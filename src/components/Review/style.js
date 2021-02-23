import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  review: {
    padding: "20px",
    margin: "10px 0",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      marginLeft: "10px",
    },
  },
  comment: {
    marginTop: "10px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      color: "#8e8e8e",
      marginLeft: "10px",
    },
  },
});
