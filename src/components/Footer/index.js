import { Container, Typography } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

export const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div>
        <Container maxWidth="xl" className={classes.container}>
          <Typography variant="h5" component={Link} to="/">
            ReactShop
          </Typography>
          <Typography component="span">
            Copyright &copy; {new Date().getFullYear()}.
          </Typography>
        </Container>
      </div>
    </footer>
  );
};
