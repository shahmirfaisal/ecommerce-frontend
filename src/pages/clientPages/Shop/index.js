import { useEffect } from "react";
import { Products } from "../../../components/Products/";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/product";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export const Shop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Our Products
          </Typography>
          <Products products={products} />
        </>
      )}
    </Container>
  );
};
