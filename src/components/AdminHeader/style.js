import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    "& a": {
      "&:not(:last-child, &:first-child)": {
        marginRight: "30px",
      },
    },
  },
  heading: {
    fontWeight: 600,
    marginRight: "auto",
  },
});
