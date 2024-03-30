import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotification } from '../redux/features/notificationSlice';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  console.log('notification', notification);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  }, [notification, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
