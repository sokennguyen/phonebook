import { useState, useEffect } from 'react';

const Faulty = ({ message }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (message && message!=='') {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) {
    return null
  }

  return (
    <>
        <div className='error'>
        {message}
        </div>
    </>
  );
};

export default Faulty;
