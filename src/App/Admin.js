import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "../redux/slices/admin";
import { Route, Switch } from "react-router-dom";
import { adminRoutes } from "../routes/adminRoutes";
import { AdminHeader } from "../components/AdminHeader/";

export const Admin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.loading);

  useEffect(() => {
    dispatch(isLogin());
    console.log("CLUE");
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
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
