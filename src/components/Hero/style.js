import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    marginTop: "50px",
    borderBottom: "1px solid #e4e4e4",
    paddingBottom: "40px",
    marginBottom: "80px",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: "15px",
  },

  detail: {
    marginBottom: "20px",
    fontSize: "18px",
  },

  svg: {
    width: "100%",
  },

  cart: {
    animation: `$cart 0.6s ease-in infinite alternate`,
  },

  browser: {
    animation: `$browser 0.6s ease-in infinite alternate`,
  },

  "@keyframes cart": {
    from: {
      transform: "translateY(0)",
    },
    to: {
      transform: "translateY(4rem)",
    },
  },

  "@keyframes browser": {
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: "translateX(4rem)",
    },
  },
});
