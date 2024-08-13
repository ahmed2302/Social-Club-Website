import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl, USERS } from "../Api/Api";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [currentUser, setCurretUser] = useState("");

  const cookies = new Cookies();
  const userId = cookies.get("userId");

  useEffect(() => {
    axios.get(`${baseUrl}/${USERS}/${userId}`).then((data) => {
      setCurretUser(data.data.data);
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
