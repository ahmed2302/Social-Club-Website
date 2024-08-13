import { useContext } from "react";
import { SideBarContext } from "../Context/SideBarContext";
import profileImage from "../assets/images/profile-1.jpg";

export default function NotificationsPopup() {
  const { linksState, setLinksState } = useContext(SideBarContext);
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("notifications-popup")) {
          setLinksState((prev) => ({
            ...prev,
            notifications: false,
          }));
        }
      }}
      className={
        linksState.notifications
          ? "notifications-popup active"
          : "notifications-popup"
      }>
      <div className="notifications-card">
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>keke Benjamin</b> accepted your friend request
            </span>
            <small className="text-muted">2 Days Ago</small>
          </div>
        </div>
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>Johan Doe</b> commented on your post
            </span>
            <small className="text-muted">1 Hour Ago</small>
          </div>
        </div>
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>Marry Oppong</b> and <b>283 Others</b> liked your post
            </span>
            <small className="text-muted">4 Minutes Ago</small>
          </div>
        </div>
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>Doris Y. Lartey</b> commented on a post you are tagged in
            </span>
            <small className="text-muted">2 Days Ago</small>
          </div>
        </div>
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>Keyley Jenner</b> commented on a post you are tagged in
            </span>
            <small className="text-muted">1 Hour Ago</small>
          </div>
        </div>
        <div>
          <div className="profile-photo">
            <img src={profileImage} alt="img" />
          </div>
          <div className="notifications-body">
            <span>
              <b>Jane Doe</b> commented on your post
            </span>
            <small className="text-muted">1 Hour Ago</small>
          </div>
        </div>
      </div>
    </div>
  );
}
