import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
