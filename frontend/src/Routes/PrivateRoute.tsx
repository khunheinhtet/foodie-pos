import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const PrivateRoute = () => {
  const { fetchData } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      fetchData(accessToken);
    }
  }, [accessToken]);
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoute;
