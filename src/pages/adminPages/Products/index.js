import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@material-ui/core";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  Add,
  KeyboardArrowDown,
} from "@material-ui/icons";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/admin";
import { Row } from "./Row";
import { useHistory } from "react-router-dom";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { Loader } from "../../../components/Loader/";

export const Products = withAdminAuth(true)((props) => {
  const { push } = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);
  const loading = useSelector((state) => state.admin.contentLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Products
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "auto", display: "flex" }}
            size="large"
            startIcon={<Add />}
            onClick={() => push("/admin/create-product")}
          >
            Create
          </Button>

          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Sold</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <Row product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
});
