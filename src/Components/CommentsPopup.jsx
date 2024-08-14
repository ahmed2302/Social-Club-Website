import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, COMMENTS, POSTS } from "../Api/Api";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { AlertContext } from "../Context/AlertContext";
import { useNavigate } from "react-router-dom";

export default function CommentsPopup({ id }) {
  const [comments, setComments] = useState([]);
  const [res, setRes] = useState(1);
  const [form, setForm] = useState({ body: "" });

  const cookies = new Cookies();
  const token = cookies.get("social-media");

  const { setAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/${POSTS}/${id}`).then((data) => {
      setComments(data.data.data.comments);
    });
  }, [id, res]);

  function handleComment() {
    axios
      .post(`${baseUrl}/${POSTS}/${id}/${COMMENTS}`, form, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRes((prev) => prev + 1);
        setForm({ body: "" });

        setAlert({ msg: "Comment Added Successfully", bool: true });
        setTimeout(() => {
          setAlert({ msg: "", bool: false });
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setAlert({ msg: "Please Login To can Comment", bool: true });
          setTimeout(() => {
            setAlert({ msg: "", bool: false });
          }, 3000);
          navigate("/login");
        }
      });
  }

  const commentsList = comments.map((comment) => (
    <div className="conmment" key={comment.id}>
      <div className="owner">
        <div className="profile-photo">
          <img src={comment.author.profile_image} alt={"profile Image"} />
        </div>
        <div className="name">{comment.author.name}</div>
        <div className="time">
          {comment.author.created_at.split("T")[1].split(".")[0]}
        </div>
      </div>
      <div className="body">{comment.body}</div>
    </div>
  ));
  return (
    <div className={"comments-popup"}>
      <div className="box">
        <div className="commentInput">
          <input
            value={form.body}
            onChange={(e) => {
              setForm({ body: e.target.value });
            }}
            type="text"
            placeholder="Add Comment..."
          />
          <button onClick={handleComment}>Comment</button>
        </div>
        <div className="conmmentsContainer">{commentsList}</div>
      </div>
    </div>
  );
}

CommentsPopup.propTypes = {
  id: PropTypes.number.isRequired, // or PropTypes.number if `id` is a number
};
