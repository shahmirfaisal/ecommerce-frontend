import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    "&.MuiPaper-elevation4": {
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 4%), 0px 4px 5px 0px rgb(0 0 0 / 8%), 0px 1px 10px 0px rgb(0 0 0 / 6%)",
    },
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
  activeLink: {
    color: theme.palette.primary.main,
  },
}));
