import { useEffect } from "react";
import { Products } from "../../../components/Products/";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../../../redux/slices/product";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import { Loader } from "../../../components/Loader/";

export const CategoryProducts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchCategoryProducts(id));
  }, [id]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            Products related to '{products[0]?.category?.name}'
          </Typography>
          <Products products={products} />
        </>
      )}
    </Container>
  );
};
