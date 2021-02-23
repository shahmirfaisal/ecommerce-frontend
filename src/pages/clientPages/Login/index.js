import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/user";
import { useHistory } from "react-router-dom";
import { withUserAuth } from "../../../hoc/withUserAuth";

export const Login = withUserAuth(false)((props) => {
  const { push } = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.authLoading);

  const changeEmailHandler = (e) => setEmail(e.target.value);
  const changePasswordHandler = (e) => setPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" className={classes.heading}>
        Login
      </Typography>

      <Paper component="form" className={classes.form} onSubmit={loginHandler}>
        <TextField
          label="Email"
          type="email"
          className={classes.textField}
          value={email}
          onChange={changeEmailHandler}
        />
        <TextField
          label="Password"
          type="password"
          className={classes.textField}
          value={password}
          onChange={changePasswordHandler}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          disabled={loading}
          endIcon={
            loading ? <CircularProgress size={20} color="primary" /> : null
          }
        >
          Login
        </Button>
        <Typography>Don't have an account?</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => push("/signup")}
        >
          Signup
        </Button>
      </Paper>
    </Container>
  );
});
