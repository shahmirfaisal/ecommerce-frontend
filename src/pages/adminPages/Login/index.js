import { useState } from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Box
} from "@material-ui/core"
import {} from "@material-ui/icons"
import { useStyles } from "../../clientPages/Login/style"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../redux/slices/admin"
import { withAdminAuth } from "../../../hoc/withAdminAuth"

export const Login = withAdminAuth(false)((props) => {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.admin.authLoading)

  const changeEmailHandler = (e) => setEmail(e.target.value)
  const changePasswordHandler = (e) => setPassword(e.target.value)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" className={classes.heading}>
        Login
      </Typography>

      <Box
        sx={{
          mb: 3,
          "& > p": {
            fontSize: "16px"
          }
        }}
      >
        <Typography>
          This is a demo site so you can use the following credentials:
        </Typography>
        <Typography>admin@admin.com</Typography>
        <Typography>admin</Typography>
      </Box>

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
      </Paper>
    </Container>
  )
})
