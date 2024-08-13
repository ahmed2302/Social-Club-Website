import { useContext, useEffect, useState } from "react";
import profileImage from "../assets/images/profile-1.jpg";
import { UserContext } from "../Context/UserContext";
import { SideBarContext } from "../Context/SideBarContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SideBar() {
  const { currentUser } = useContext(UserContext);
  const { setLinksState } = useContext(SideBarContext);
  const [hide, setHide] = useState({
    notifications: false,
    messages: false,
    requests: false,
  });

  const navigate = useNavigate();

  const [active, setActive] = useState({
    home: true,
    explor: false,
    notifications: false,
    messages: false,
    requests: false,
    bookmarks: false,
    analytics: false,
    theme: false,
    settings: false,
  });

  const cookies = new Cookies();
  function handleClick(e) {
    if (e.target.name === "notifications") {
      setHide((prev) => ({ ...prev, notifications: true }));
    } else if (e.target.name === "messages") {
      setHide((prev) => ({ ...prev, messages: true }));
    } else if (e.target.name === "requests") {
      setHide((prev) => ({ ...prev, requests: true }));
    }
    setActive({
      home: false,
      explor: false,
      notifications: false,
      messages: false,
      requests: false,
      bookmarks: false,
      analytics: false,
      theme: false,
      settings: false,
    });

    setActive((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }
  useEffect(() => {
    setLinksState(active);
  }, [active, setLinksState]);

  return (
    <div className="left">
      <div
        className="profile"
        onClick={() => {
          cookies.set("targetUserId", currentUser.id);
          // window.location.pathname = "/detailsPage";
          navigate("detailsPage");
        }}>
        <div className="profile-photo">
          <img
            src={currentUser !== "" ? currentUser.profile_image : profileImage}
            alt="img"
          />
        </div>
        <div className="handle">
          <h4>{currentUser !== "" ? currentUser.name : "Guest"}</h4>
          <p className="text-muted">
            {currentUser !== "" ? currentUser.email : "@guest"}
          </p>
        </div>
      </div>

      <div className="side-bar">
        <Link to={"/createPost"} className="createNewPost menu-item">
          <span>
            <i className="uil uil-plus-circle"></i>
          </span>
          <h3>Create Post</h3>
        </Link>
        <a
          onClick={handleClick}
          name="home"
          className={active.home ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Home</h3>
        </a>
        <a
          onClick={handleClick}
          name="explor"
          className={active.explor ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-compass"></i>
          </span>
          <h3>Explore</h3>
        </a>
        <a
          onClick={handleClick}
          name="notifications"
          className={
            active.notifications
              ? "menu-item notifications active"
              : "menu-item notifications"
          }
          id="notifications">
          <span>
            <i className="uil uil-bell">
              <small
                style={{ display: hide.notifications ? "none" : "block" }}
                className="notification-count">
                9+
              </small>
            </i>
          </span>
          <h3>Notification</h3>
        </a>
        <a
          onClick={handleClick}
          name="messages"
          className={
            active.messages ? "menu-item message active" : "menu-item message"
          }
          id="messages-notifications">
          <span>
            <i className="uil uil-envelope-alt">
              <small
                style={{ display: hide.messages ? "none" : "block" }}
                className="notification-count">
                6
              </small>
            </i>
          </span>
          <h3>Messages</h3>
        </a>
        <a
          onClick={handleClick}
          name="requests"
          className={
            active.requests ? "menu-item request active" : "menu-item request"
          }
          id="request-notification">
          <span>
            <i className="uil uil-user">
              <small
                style={{ display: hide.requests ? "none" : "block" }}
                className="notification-count">
                3
              </small>
            </i>
          </span>
          <h3>Requests</h3>
        </a>
        <a
          onClick={handleClick}
          name="bookmarks"
          className={active.bookmarks ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
          <h3>Bookmarks</h3>
        </a>
        <a
          onClick={handleClick}
          name="analytics"
          className={active.analytics ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-chart-line"></i>
          </span>
          <h3>Analytics</h3>
        </a>
        <a
          onClick={handleClick}
          id="theme"
          name="theme"
          className={active.theme ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-palette"></i>
          </span>
          <h3>Theme</h3>
        </a>
        <a
          onClick={handleClick}
          name="settings"
          className={active.settings ? "menu-item active" : "menu-item"}>
          <span>
            <i className="uil uil-setting"></i>
          </span>
          <h3>Setting</h3>
        </a>
      </div>
    </div>
  );
}
