import PropTypes from "prop-types";

export default function Alert({ message }) {
  return <div className="alert">{message}</div>;
}

// التحقق من الـ props
Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
