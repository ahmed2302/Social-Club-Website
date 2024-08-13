import axios from "axios";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { baseUrl, LOGIN } from "../Api/Api";
import Loading from "../Components/Loading";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../Context/AlertContext";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const cookies = new Cookies();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      setErr("");
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const userId = res.data.user.id;
      cookies.set("social-media", token);
      cookies.set("userId", userId);
      setAlert({ msg: "Login Successfully", bool: true });
      setTimeout(() => {
        setAlert({ msg: "", bool: false });
      }, 3000);
      // window.location.pathname = "/";
      navigate("/", { replace: true });
    } catch (err) {
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
            <h1 style={{ marginBottom: "30px" }}>Login Now</h1>
            <Form.Group
              className="form-custom"
              controlId="exampleForm.ControlInput3">
              <Form.Control
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
              controlId="exampleForm.ControlInput4">
              <Form.Control
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
            <Button onClick={handleSubmit} className="btn  py-2 px-5">
              Login
            </Button>
            <span style={{ margin: "0 30px", color: "black" }}>Or</span>
            <Link className="btn " to="/register">
              Register
            </Link>
            {err !== "" && <div className="error">{err}</div>}
          </div>
        </Form>
      </div>
    </>
  );
}
