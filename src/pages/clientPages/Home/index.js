import { useEffect } from "react";
import { Container, Typography, Hidden, Box } from "@material-ui/core";
import { Hero } from "../../../components/Hero/";
import { Products } from "../../../components/Products/";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/product";
import { Search } from "../../../components/Search/";
import { Filter } from "../../../components/Filter/";
import { filterProducts } from "../../../utils";
import { Loader } from "../../../components/Loader/";

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filter = useSelector((state) => state.products.filter);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Container maxWidth="lg">
      <Hero />

      <Typography
        variant="h3"
        style={{ fontWeight: "bold", marginBottom: "30px" }}
        id="products"
      >
        Our Products
      </Typography>

      <Hidden mdUp>
        <Search className={classes.input} />
      </Hidden>

      <Box marginBottom={5}>
        <Filter />
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <Products products={filterProducts(products, filter)} />
      )}
    </Container>
  );
};
