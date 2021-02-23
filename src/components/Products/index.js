import { Product } from "../Product/";
import { Grid } from "@material-ui/core";

export const Products = ({ products }) => {
  return (
    <Grid container spacing={5}>
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} lg={4}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
};
