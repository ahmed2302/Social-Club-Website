import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl, POSTS, USERS } from "../Api/Api";
import Cookies from "universal-cookie";
import profileImage from "../assets/images/profile-1.jpg";
import CommentsPopup from "../Components/CommentsPopup";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { AlertContext } from "../Context/AlertContext";

export default function DetailsPage() {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState("");
  const cookies = new Cookies();
  const id = cookies.get("targetUserId");
  const token = cookies.get("social-media");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}/${id}/${POSTS}`)
      .then((data) => setPosts(data.data.data));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}/${id}`)
      .then((data) => setUserData(data.data.data));
  }, [id]);

  const [visibleComments, setVisibleComments] = useState({});
  const [visibleEdit, setVisibleEdit] = useState({});

  const handleCommentClick = (postId) => {
    setVisibleComments((prev) => {
      const newState = {};
      newState[postId] = !prev[postId];
      return newState;
    });
  };

  const handleEditClick = (postId) => {
    setVisibleEdit((prev) => {
      const newState = {};
      newState[postId] = !prev[postId];
      return newState;
    });
  };

  const handleDeletePost = (postId) => {
    axios
      .delete(`${baseUrl}/${POSTS}/${postId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlert({ msg: "Post Deleted Successfully", bool: true });
        setTimeout(() => {
          setAlert({ msg: "", bool: false });
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.error_message);
      });
  };

  const handleEditPost = (postId) => {
    console.log("edit");
    console.log(postId);
    navigate("/editPost");
    cookies.set("targetPost", postId);
  };

  let reversedPosts = [...posts].reverse();

  const postsList = reversedPosts.map((post, key) => {
    if (
      typeof post.author.profile_image == "string" &&
      typeof post.image == "string"
    ) {
      return (
        <div className="post" key={key}>
          <div className="profile-info">
            <div>
              <div
                className="profile-photo"
                onClick={() => {
                  cookies.set("targetUserId", post.author.id);
                  // window.location.pathname = "/detailsPage";
                  navigate("/detailsPage");
                }}>
                <img src={post.author.profile_image} alt={"profile Image"} />
              </div>
              <div>
                <h3 className="name">{post.author.name}</h3>
                <small>{post.created_at}</small>
              </div>
            </div>
            {currentUser.id === post.author.id && (
              <span onClick={() => handleEditClick(post.id)} className="edit">
                <div
                  style={{ display: visibleEdit[post.id] ? "flex" : "none" }}
                  className="popup">
                  <p>
                    <i
                      onClick={() => handleDeletePost(post.id)}
                      className="uil uil-cancel"></i>
                  </p>
                  <p>
                    <i
                      onClick={() => handleEditPost(post.id)}
                      className="uil uil-edit"></i>
                  </p>
                </div>
                <i className="uil uil-ellipsis-h"></i>
              </span>
            )}
          </div>
          <div className="post-body">{post.body}</div>
          <div className="post-photo">
            <img src={post.image} alt={"post Image"} />
          </div>
          <div className="action-buttons">
            <div className="interaction-buttons">
              <span>
                <i
                  onClick={(e) => {
                    e.target.classList.add("liked");
                  }}
                  className="uil uil-heart"></i>
              </span>
              <span onClick={() => handleCommentClick(post.id)}>
                <i className="uil uil-comment-dots"></i>
                <span className="comments-count">{post.comments_count}</span>
              </span>
              <span>
                <i className="uil uil-share-alt"></i>
              </span>
            </div>
            <div className="bookmark">
              <span>
                <i className="uil uil-bookmark-full"></i>
              </span>
            </div>
          </div>
          {visibleComments[post.id] && <CommentsPopup id={post.id} />}
        </div>
      );
    }
  });

  return (
    <>
      {userData === "" || posts.length == 0 ? (
        <Loading />
      ) : (
        <div className="detailsPage">
          <div className="container">
            <div className="details">
              <div
                className="profile"
                onClick={() => {
                  cookies.set("targetUserId", userData.id);
                  // window.location.pathname = "/detailsPage";
                  navigate("/detailsPage");
                }}>
                <div className="profile-photo">
                  <img
                    src={
                      userData !== "" ? userData.profile_image : profileImage
                    }
                    alt="img"
                  />
                </div>
                <div className="handle">
                  <h4>{userData !== "" ? userData.name : "Guest"}</h4>
                  <p className="text-muted">
                    {userData !== "" ? userData.email : "@guest"}
                  </p>
                </div>
              </div>
              <div className="posts-count">{userData.posts_count} Post</div>
              <div className="comment-count">
                {userData.comments_count} Comment
              </div>
            </div>
            <div className="content">
              <div className="posts-wrapper">{postsList}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
