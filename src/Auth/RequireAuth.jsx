import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function RequireAuth() {
  const cookies = new Cookies();
  const token = cookies.get("social-media");

  return token ? <Outlet /> : <Navigate to="/login" />;
}
