import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  stepper: {
    boxShadow: "1px 2px 6px gainsboro",
    marginTop: "40px",
    marginBottom: "20px",
    "& .MuiStepLabel-label": {
      fontSize: "16px",
    },
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      fontWeight: "700",
    },
    "& .MuiStepIcon-text": {
      fill: "white",
      fontSize: "16px",
    },
    "& .MuiStepLabel-label.MuiStepLabel-completed": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
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
  cardForm: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    "& > *": {
      marginBottom: "10px",
    },
  },
  card: {
    boxShadow: "1px 2px 6px gainsboro",
    backgroundColor: "white",
    padding: "20px",
  },
  demoCard: {
    padding: "5px 10px",
    marginTop: "20px",
    maxWidth: "500px",
  },
}));
