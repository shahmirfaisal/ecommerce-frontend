import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const withUserAuth = (auth) => (WrappedComponent) => {
  return (props) => {
    const { replace } = useHistory();
    const user = useSelector((state) => state.users.user);

    useEffect(() => {
      if (auth && !user) replace("/");
      if (!auth && user) replace("/");
    }, [user]);

    return <WrappedComponent {...props} />;
  };
};
