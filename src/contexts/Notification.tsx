import {FC, useState, useEffect } from 'react';

interface NotificationProps{
    message:string
}

const Notification:FC<NotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); 
    }
  }, [message]);

  return (
    <div className={`notification ${isVisible ? 'show' : 'hide'}`}>
      {isVisible && (
        <div className="notification-content">
          {message}
        </div>
      )}
    </div>
  );
};

export default Notification;
