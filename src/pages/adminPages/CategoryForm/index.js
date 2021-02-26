import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { createCategory, editCategory } from "../../../redux/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Axios } from "../../../api/instances";
import * as Api from "../../../api/endpoints";
import { withAdminAuth } from "../../../hoc/withAdminAuth";
import { Loader } from "../../../components/Loader/";

export const CategoryForm = withAdminAuth(true)(({ edit }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.authLoading);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const changeNameHandler = (e) => setName(e.target.value);

  const createCategoryHandler = (e) => {
    e.preventDefault();
    if (edit) dispatch(editCategory({ id, name }));
    else dispatch(createCategory({ name }));
  };

  useEffect(() => {
    (async () => {
      if (edit) {
        console.log("Category");
        setCategoryLoading(true);
        const res = await Axios.get(Api.GET_CATEGORY(id));
        setName(res.data.category.name);
        setCategoryLoading(false);
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      {categoryLoading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h3" className={classes.heading}>
            {edit ? "Edit" : "Create"} Product
          </Typography>

          <form className={classes.form} onSubmit={createCategoryHandler}>
            <TextField label="Name" value={name} onChange={changeNameHandler} />
            <Button
              style={{ color: "white" }}
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
              endIcon={
                loading ? <CircularProgress size={20} color="primary" /> : null
              }
            >
              {edit ? "Edit" : "Create"}
            </Button>
          </form>
        </>
      )}
    </Container>
  );
});
