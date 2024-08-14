import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SideBarContext = createContext();

export default function SideBarProvider({ children }) {
  const [linksState, setLinksState] = useState("");
  const [sideBarIcon, setSideBarIcon] = useState(false);
  return (
    <SideBarContext.Provider
      value={{ linksState, setLinksState, sideBarIcon, setSideBarIcon }}>
      {children}
    </SideBarContext.Provider>
  );
}

// التحقق من الـ props
SideBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
