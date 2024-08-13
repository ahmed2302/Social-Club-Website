import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import RequireAuth from "./Auth/RequireAuth";
import CreatePost from "./Pages/CreatePost";
import Err404 from "./Pages/Err404";
import UserProvider from "./Context/UserContext";
import DetailsPage from "./Pages/DetailsPage";
import LoadinPage from "./Pages/LoadinPage";
import EditPost from "./Pages/EditPost";
import Alert from "./Components/Alert";
import { useContext } from "react";
import { AlertContext } from "./Context/AlertContext";

export default function App() {
  const { alert } = useContext(AlertContext);

  return (
    <UserProvider>
      {alert.bool && <Alert message={alert.msg} />}
      <LoadinPage>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/createPost"
              element={
                <>
                  <Header />
                  <CreatePost />
                </>
              }
            />
            <Route
              path="/detailsPage"
              element={
                <>
                  <Header />
                  <DetailsPage />
                </>
              }
            />

            <Route
              path="/editPost"
              element={
                <>
                  <Header />
                  <EditPost />
                </>
              }
            />
          </Route>

          <Route path="/404" element={<Err404 />} />
          <Route path="/*" element={<Err404 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </LoadinPage>
    </UserProvider>
  );
}
