import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/slices/admin";
import { Route, Switch, useHistory } from "react-router-dom";
import { adminRoutes } from "../routes/adminRoutes";
import { AdminHeader } from "../components/AdminHeader/";
import { Loader } from "../components/Loader/";

export const Admin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.loading);
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
          <AdminHeader />

          <Switch>
            {adminRoutes.map((route) => (
              <Route {...route} />
            ))}
          </Switch>
        </>
      )}
    </>
  );
};
