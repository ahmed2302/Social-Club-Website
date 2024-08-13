import axios from "axios";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { baseUrl, REGISTER } from "../Api/Api";
import Loading from "../Components/Loading";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../Context/AlertContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const cookies = new Cookies();

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);

  function handleChange(e) {
    const { name } = e.target;

    if (name === "image") {
      setForm({ ...form, [name]: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("image", form.image);
    console.log(form);
    try {
      setErr("");
      const res = await axios.post(`${baseUrl}/${REGISTER}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      const token = res.data.token;
      const userId = res.data.user.id;
      cookies.set("social-media", token);
      cookies.set("userId", userId);
      setAlert({ msg: "Register Successfully", bool: true });
      setTimeout(() => {
        setAlert({ msg: "", bool: false });
      }, 3000);
      // window.location.pathname = "/";
      navigate("/", { replace: true });
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
            <h1 className="text-success fw-bold my-4 mx-0">Register Now</h1>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{ padding: "10px" }}
                type="text"
                name="username"
                placeholder="Enter Your User Name..."
                value={form.username}
                onChange={handleChange}
                required
              />
              <Form.Label>User Name</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput2">
              <Form.Control
                style={{ padding: "10px" }}
                type="text"
                name="name"
                placeholder="Enter Your Name..."
                value={form.name}
                onChange={handleChange}
                required
              />
              <Form.Label>Name</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput3">
              <Form.Control
                style={{ padding: "10px" }}
                type="email"
                name="email"
                placeholder="Enter Your Email..."
                value={form.email}
                onChange={handleChange}
                required
              />
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput4">
              <Form.Control
                style={{ padding: "10px" }}
                type="password"
                name="password"
                placeholder="Enter Your Password..."
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              <Form.Label>Password</Form.Label>
            </Form.Group>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput5">
              <Form.Control
                style={{ padding: "10px 15px" }}
                type="file"
                name="image"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} className="btn py-2 px-5">
              Register
            </Button>
            <span style={{ margin: "0 30px" }}>Or</span>
            <Link className="btn" to="/login">
              Login
            </Link>
            {err !== "" && <div className="error">{err}</div>}
          </div>
        </Form>
      </div>
    </>
  );
}
