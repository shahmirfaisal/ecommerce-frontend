import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiPaper-elevation4": {
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 4%), 0px 4px 5px 0px rgb(0 0 0 / 8%), 0px 1px 10px 0px rgb(0 0 0 / 6%)",
    },
    "& form": {
      margin: "auto",
    },
  },
  heading: {
    // marginRight: "auto",
  },
  navItems: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    "&:not(:last-child)": {
      marginRight: "25px",
    },

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  input: {
    width: "300px",
    // "& > div::before": {
    //   borderBottom: "1px solid #3399FF",
    // },
    // "& > div::after": {
    //   borderBottom: "1px solid #3399FF",
    // },
    // "& > div:hover:before": {
    //   borderBottom: "1px solid #3399FF",
    // },
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));
