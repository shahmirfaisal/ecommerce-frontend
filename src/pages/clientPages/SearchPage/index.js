import { useStyles } from "./style";
import { useEffect } from "react";
import { Products } from "../../../components/Products/";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchProducts } from "../../../redux/slices/product";
import { Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader/";

export const SearchPage = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const classes = useStyles();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    dispatch(fetchSearchProducts(params.get("search")));
  }, [dispatch, search]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Result for '{new URLSearchParams(search).get("search")}'
          </Typography>
          <Products products={products} />
        </>
      )}
      {!loading && !products.length ? (
        <Typography style={{ marginTop: "20px" }}>No product found!</Typography>
      ) : null}
    </Container>
  );
};
