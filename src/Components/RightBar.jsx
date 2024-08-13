import { useContext } from "react";
import profileImage from "../assets/images/profile-1.jpg";
import { SideBarContext } from "../Context/SideBarContext";

export default function RightBar() {
  const { linksState } = useContext(SideBarContext);
  return (
    <div className="right">
      <div className={linksState.messages ? "messages active" : "messages"}>
        <div className="title">
          <h4>Messages</h4>
          <i className="uil uil-edit"></i>
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search messages"
            id="message-search"
          />
        </div>
        <div className="category">
          <span className="active">Primary</span>
          <span>General</span>
          <span>Requests (7) </span>
        </div>
        <div className="messages-list">
          <div className="message">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>Just woke up bruh </small>
            </div>
          </div>

          <div className="message">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>Just woke up bruh </small>
            </div>
          </div>

          <div className="message">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>Just woke up bruh </small>
            </div>
          </div>

          <div className="message">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>Just woke up bruh </small>
            </div>
          </div>
        </div>
      </div>
      <h4>Request</h4>
      <div
        className={
          linksState.requests ? "requests-list active" : "requests-list"
        }>
        <div className="request">
          <div className="profile">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>8 mutual friends </small>
            </div>
          </div>
          <div className="btns">
            <div className="btn btn-primary">Accept</div>
            <div className="btn">Decline</div>
          </div>
        </div>

        <div className="request">
          <div className="profile">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>8 mutual friends </small>
            </div>
          </div>
          <div className="btns">
            <div className="btn btn-primary">Accept</div>
            <div className="btn">Decline</div>
          </div>
        </div>

        <div className="request">
          <div className="profile">
            <div className="profile-photo">
              <img src={profileImage} alt="" />
            </div>
            <div className="text">
              <p>Edem Quist</p>
              <small>8 mutual friends </small>
            </div>
          </div>
          <div className="btns">
            <div className="btn btn-primary">Accept</div>
            <div className="btn">Decline</div>
          </div>
        </div>
      </div>
    </div>
  );
}
