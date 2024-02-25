import PropTypes from 'prop-types';

const Notification = ({ message, status }) => {
  return <div className={status}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
};

Notification.defaultProps = {
  status: 'error',
};

export default Notification;
