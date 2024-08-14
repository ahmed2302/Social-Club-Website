import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { AlertContext } from "../Context/AlertContext";
import { useContext } from "react";

export default function RequireAuth() {
  const cookies = new Cookies();
  const token = cookies.get("social-media");
  const { setAlert } = useContext(AlertContext);

  // return token ? <Outlet /> : <Navigate to="/login" />;

  if (token) {
    return <Outlet />;
  } else {
    setAlert({ msg: "Please Login To Open This Page", bool: true });
    setTimeout(() => {
      setAlert({ msg: "", bool: false });
    }, 3000);
    return <Navigate to="/login" />;
  }
}
