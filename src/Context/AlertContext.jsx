import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ msg: "", bool: false });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

// التحقق من الـ props
AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
