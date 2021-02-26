import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import {} from "@material-ui/icons";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { applyFilter } from "../../redux/slices/product";

export const Filter = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(applyFilter("All"));
  }, []);

  const changeFilterHandler = (e) => {
    setFilter(e.target.value);
    dispatch(applyFilter(e.target.value));
  };

  return (
    <TextField
      select
      label="Filter"
      value={filter}
      onChange={changeFilterHandler}
      className={classes.textField}
    >
      <MenuItem value="All">All</MenuItem>
      {categories.map((category) => (
        <MenuItem value={category.name} key={category.name}>
          {category.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
