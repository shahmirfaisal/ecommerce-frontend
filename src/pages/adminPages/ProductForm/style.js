import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    margin: "30px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    "& > *": {
      marginBottom: "20px",
    },
    "& .MuiFormLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      fontSize: "23px",
    },
  },
  img: {
    height: "250px",
    "& img": {
      width: "100%",
      height: "100%",
      display: "block",
      objectFit: "contain",
      objectPosition: "center",
      boxShadow: "1px 1px 10px rgb(226 226 226)",
    },
  },
});
