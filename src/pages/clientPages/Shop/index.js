import { useEffect } from "react";
import { Products } from "../../../components/Products/";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/product";
import { Container, Typography, Box } from "@material-ui/core";
import { useStyles } from "./style";
import { Filter } from "../../../components/Filter/";
import { filterProducts } from "../../../utils";
import { Loader } from "../../../components/Loader/";

export const Shop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const products = useSelector((state) => state.products.products);
  const filter = useSelector((state) => state.products.filter);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Our Products
          </Typography>
          <Box marginBottom={5}>
            <Filter />
          </Box>
          <Products products={filterProducts(products, filter)} />
        </>
      )}
    </Container>
  );
};
