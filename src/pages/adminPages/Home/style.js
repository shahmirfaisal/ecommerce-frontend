import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 600,
  },
  container: {
    marginTop: "40px",
  },
  paper: {
    padding: "20px 20px",
    textAlign: "center",
    "& a": {
      fontWeight: 600,
      color: theme.palette.primary.main,
      "&:hover": {
        color: "black",
      },
    },
  },
}));
