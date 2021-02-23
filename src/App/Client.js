import { useEffect } from "react";
import { Header } from "../components/Header";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/slices/user";
import { clientRoutes } from "../routes/clientRoutes";

export const Client = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Switch>
            {clientRoutes.map((route) => (
              <Route {...route} />
            ))}
          </Switch>
        </>
      )}
    </>
  );
};
