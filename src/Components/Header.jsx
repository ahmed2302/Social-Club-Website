import { useContext } from "react";
import Cookies from "universal-cookie";
import { UserContext } from "../Context/UserContext";
import logo from "../../public/logo.svg";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../Context/AlertContext";

export default function Header() {
  const cookies = new Cookies();
  const { currentUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  function handleLogout() {
    cookies.remove("userId");
    cookies.remove("social-media");
    // window.location.pathname = "/login";
    navigate("/login");

    setAlert({ msg: "Logout Successfully", bool: true });
    setTimeout(() => {
      setAlert({ msg: "", bool: false });
    }, 3000);
  }

  return (
    <header className="header">
      <div className="container">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img style={{ width: "40px" }} src={logo} alt="logo" />
          <h2
            onClick={() => {
              // window.location.pathname = "/";
              navigate("/");
            }}
            className="logo">
            Social Club
          </h2>
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for creators, inspirations, and projects"
          />
        </div>
        <div className="create">
          {currentUser !== "" ? (
            <>
              <div
                className="profile-photo show"
                onClick={() => {
                  cookies.set("targetUserId", currentUser.id);
                  // window.location.pathname = "/detailsPage";
                  navigate("/detailsPage");
                }}>
                <img src={currentUser.profile_image} alt="img" />
              </div>
              <div onClick={handleLogout} className="btn btn-primary">
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="btn btn-primary">
                Login
              </div>
              <div
                onClick={() => {
                  navigate("/register");
                }}
                className="btn btn-primary">
                Register
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
