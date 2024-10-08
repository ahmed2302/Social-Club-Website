import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseUrl, POSTS } from "../Api/Api";
import { LoadingContext } from "../Context/loadingContext";
import CommentsPopup from "./CommentsPopup";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import defaultImage from "../assets/images/profile-1.jpg";
import { AlertContext } from "../Context/AlertContext";

export default function ContentPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [toTop, setToTop] = useState(false);

  const { setLoad } = useContext(LoadingContext);
  const { currentUser } = useContext(UserContext);

  const cookies = new Cookies();
  const token = cookies.get("social-media");
  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);

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
        alert("the post has been deleted successfully");
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

  useEffect(() => {
    setLoad(true);
    axios.get(`${baseUrl}/posts?limit=20&page=${page}`).then((data) => {
      setPosts((prev) => [...prev, ...data.data.data]);
      setLoad(false);
    });
  }, [page, setLoad]);

  const filteredPosts = posts.filter((post) => typeof post.image == "string");

  const postsList = posts.map((post, key) => {
    return (
      <div className="post" key={key}>
        <div className="profile-info">
          <div>
            <div
              className="profile-photo"
              onClick={() => {
                cookies.set("targetUserId", post.author.id);
                navigate("/detailsPage");
              }}>
              <img
                src={
                  typeof post.author.profile_image === "string"
                    ? post.author.profile_image
                    : defaultImage
                }
                alt="img"
              />
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
        {typeof post.image === "string" && (
          <div className="post-photo">
            <img src={post.image} alt={"post Image"} />
          </div>
        )}
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
  });

  const storiesList = filteredPosts.map((story, key) => {
    return (
      <div
        key={key}
        className="story"
        style={{ backgroundImage: `url(${story.image})` }}>
        <div className="profile-photo">
          <img
            src={
              typeof story.author.profile_image === "string"
                ? story.author.profile_image
                : defaultImage
            }
            alt="img"
          />
        </div>
        <p className="name">{story.author.name}</p>
      </div>
    );
  });

  useEffect(() => {
    let isFetching = false;

    function handleScroll() {
      if (
        window.scrollY + window.innerHeight + 10 >=
          document.documentElement.scrollHeight &&
        !isFetching
      ) {
        isFetching = true;
        setPage((prev) => prev + 1);

        setTimeout(() => {
          isFetching = false;
        }, 500);
      }

      if (this.window.scrollY >= this.window.innerHeight) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="middel">
      <div
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        style={{ display: toTop ? "flex" : "none" }}
        className="up">
        <i className="uil uil-arrow-up" />
      </div>
      <div className="stories-wrapper">{storiesList}</div>
      <div className="posts-wrapper">
        {/* <div className="post">
          <div className="profile-info">
            <div>
              <div className="profile-photo">
                <img
                  src="http://tarmeezacademy.com/images/users/g8KpwvYOGXapIDx.jpg"
                  alt="profile Image"
                />
              </div>
              <div>
                <h3 className="name">Ahmed Hamdy</h3>
                <small>6 minutes ago</small>
              </div>
            </div>
            <span className="edit">
              <i className="uil uil-ellipsis-h" />
            </span>
          </div>
          <div className="post-body">test</div>
          <div className="post-photo">
            <img
              src="http://tarmeezacademy.com/images/posts/qzPc3GtML5720KF.jpg"
              alt="post Image"
            />
          </div>
          <div className="action-buttons">
            <div className="interaction-buttons">
              <span>
                <i className="uil uil-heart" />
              </span>
              <span
                onClick={() => {
                  alert("comment");
                }}
                className="comments-icon">
                <i className="uil uil-comment-dots" />
                <span className="comments-count">0</span>
              </span>
              <span>
                <i className="uil uil-share-alt" />
              </span>
            </div>
            <div className="bookmark">
              <span>
                <i className="uil uil-bookmark-full" />
              </span>
            </div>
          </div>
          <CommentsPopup id={"26483"} />
        </div> */}
        {postsList}
      </div>
    </div>
  );
}
