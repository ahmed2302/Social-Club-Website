import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CommentsContext = createContext();

export default function CommtentsProvider({ children }) {
  const [comment, setComment] = useState(false);

  return (
    <CommentsContext.Provider value={{ comment, setComment }}>
      {children}
    </CommentsContext.Provider>
  );
}

// التحقق من الـ props
CommtentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
