import { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Add, EditOutlined, DeleteOutlineOutlined } from "@material-ui/icons";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../../redux/slices/admin";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { Loader } from "../../../components/Loader/";

export const Categories = withAdminAuth(true)((props) => {
  const classes = useStyles();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.contentLoading);
  const categories = useSelector((state) => state.admin.categories);
  const deleteLoading = useSelector((state) => state.admin.authLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Categories
          </Typography>

          <div className={classes.container}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "auto", display: "flex" }}
              size="large"
              startIcon={<Add />}
              onClick={() => push("/admin/create-category")}
            >
              Create
            </Button>

            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {categories.map(({ _id, name }) => (
                    <TableRow key={_id}>
                      <TableCell>{name}</TableCell>
                      <TableCell align="right">
                        {deleteLoading ? (
                          <CircularProgress size={20} color="primary" />
                        ) : (
                          <>
                            <IconButton
                              onClick={() =>
                                push(`/admin/edit-category/${_id}`)
                              }
                              color="primary"
                              size="small"
                              style={{ marginRight: "10px" }}
                            >
                              <EditOutlined />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              size="small"
                              onClick={() => dispatch(deleteCategory(_id))}
                            >
                              <DeleteOutlineOutlined />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </Container>
  );
});
