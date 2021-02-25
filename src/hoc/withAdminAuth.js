import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const withAdminAuth = (auth) => (WrappedComponent) => {
  return (props) => {
    const { replace } = useHistory();
    const admin = useSelector((state) => state.admin.admin);

    useEffect(() => {
      if (auth && !admin) replace("/admin/login");
      if (!auth && admin) replace("/admin");
    }, [admin]);

    return <WrappedComponent {...props} />;
  };
};
