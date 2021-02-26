import { useEffect } from "react";
import { Header } from "../components/Header";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/slices/user";
import { clientRoutes } from "../routes/clientRoutes";
import { Loader } from "../components/Loader/";

export const Client = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  useEffect(() => {
    dispatch(isLogin());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
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
