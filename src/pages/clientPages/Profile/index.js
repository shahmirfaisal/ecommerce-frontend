import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { withUserAuth } from "../../../hoc/withUserAuth";

export const Profile = withUserAuth(true)((props) => {
  const classes = useStyles();
  const { push } = useHistory();
  const user = useSelector((state) => state.users.user);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" className={classes.heading}>
        Your Profile
      </Typography>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th">Name</TableCell>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Email</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => push("/edit-profile")}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
});
