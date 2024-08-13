import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SideBarContext = createContext();

export default function SideBarProvider({ children }) {
  const [linksState, setLinksState] = useState("");
  return (
    <SideBarContext.Provider value={{ linksState, setLinksState }}>
      {children}
    </SideBarContext.Provider>
  );
}

// التحقق من الـ props
SideBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
