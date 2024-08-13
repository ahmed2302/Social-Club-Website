import { useState, useEffect } from "react";
import logo from "../../public/logo.svg";
import PropTypes from "prop-types";

export default function LoadinPage({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => clearTimeout(loadingTimeout); 
  }, []);

  if (!loaded) {
    return (
      <div className="loadingPage">
        <img src={logo} alt="logo" />
      </div>
    );
  }

  return children;
}

// التحقق من الـ props
LoadinPage.propTypes = {
  children: PropTypes.node.isRequired,
};
