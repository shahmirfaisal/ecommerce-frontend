import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  footer: {
    marginTop: "auto",
    color: "white",

    "& > div": {
      marginTop: "100px",
      backgroundColor: "#3c3c3c",
      padding: "30px 0",
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
