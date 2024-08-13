import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [load, setLoad] = useState(false);

  return (
    <LoadingContext.Provider value={{ load, setLoad }}>
      {children}
    </LoadingContext.Provider>
  );
}

// التحقق من الـ props
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
