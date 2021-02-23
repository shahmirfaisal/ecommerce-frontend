import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    "& > div.MuiDrawer-paper": {
      width: "250px",
      paddingTop: "20px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  input: {
    marginBottom: "20px",
  },
  text: {
    "& > span": {
      fontSize: "18px",
    },
  },
});
