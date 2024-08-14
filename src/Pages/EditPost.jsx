import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import { baseUrl, POSTS } from "../Api/Api";
import axios from "axios";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../Context/AlertContext";

export default function EditPost() {
  const [post, setPost] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("social-media");
  const postId = cookies.get("targetPost");

  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    axios.get(`${baseUrl}/${POSTS}/${postId}`).then((data) => {
      console.log(data.data.data);
      setPost((prev) => ({
        ...prev,
        title: data.data.data.title,
        body: data.data.data.body,
      }));
    });
  }, [postId]);

  function handleChange(e) {
    const { name } = e.target;

    if (name === "image") {
      setPost({ ...post, [name]: e.target.files[0] });
    } else {
      setPost({ ...post, [name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.body);
    formData.append("_method", "put");
    if (post.image != "") formData.append("image", post.image);
    try {
      setErr("");
      await axios.post(`${baseUrl}/${POSTS}/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      setAlert({ msg: "Post Updated Successfully", bool: true });
      setTimeout(() => {
        setAlert({ msg: "", bool: false });
      }, 3000);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErr(err.response.data.message);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Form className="form " onSubmit={handleSubmit}>
          <div className="custom-form">
            <h1 className="text-success fw-bold my-4 mx-0">Edit Post</h1>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="title"
                placeholder="Post Title..."
                value={post.title}
                onChange={handleChange}
                required
              />
              <Form.Label>Title</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput2">
              <Form.Control
                type="text"
                name="body"
                placeholder="Post Body..."
                value={post.body}
                onChange={handleChange}
                required
              />
              <Form.Label>Body</Form.Label>
            </Form.Group>

            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput5">
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Button type="submit" className="btn py-2 px-5">
              Edit
            </Button>
            {err !== "" && <div className="error">{err}</div>}
          </div>
        </Form>
      </div>
    </>
  );
}
