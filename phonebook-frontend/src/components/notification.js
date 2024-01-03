import { useState, useEffect } from 'react';

const Notification = ({ message,messageId }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (message && message!=='') {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message,messageId]);

  if (!visible) {
    return null
  }

  return (
    <>
        <div className='success'>
        {message}
        </div>
    </>
  );
};

export default Notification;
