import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertBox } from './MainContent.styles';

const GlobalAlert = ({ alert, setAlert }) => {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert) {
    return null;
  }

  return createPortal(
    <AlertBox type={alert.type}>
      {alert.message}
    </AlertBox>,
    document.body
  );
};

export default GlobalAlert;