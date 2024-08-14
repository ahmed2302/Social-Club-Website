import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl, USERS } from "../Api/Api";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import { AlertContext } from "./AlertContext";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurretUser] = useState("");

  const cookies = new Cookies();
  const userId = cookies.get("userId");

  const { setAlert } = useContext(AlertContext);
  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}/${userId}`)
      .then((data) => {
        setCurretUser(data.data.data);
      })
      .catch(() => {
        setAlert({ msg: "Login To Can Interact With Our Site", bool: true });
        setTimeout(() => {
          setAlert({ msg: "", bool: false });
        }, 5000);
      });
  }, [userId]);

  return (
    <UserContext.Provider value={{ currentUser, setCurretUser }}>
      {children}
    </UserContext.Provider>
  );
}

// التحقق من الـ props
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
