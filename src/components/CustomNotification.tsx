import {useEffect } from "react";
import "../styles/customNotification.css";

interface NotificationProps {
    message: string;
    visible: boolean;
    duration?: number;
    onClose: () => void;
}

function CustomNotification({ message, visible, onClose, duration = 3000 }: NotificationProps) {
    useEffect(() => {
      if (visible) {
        const timer = setTimeout(() => {
          onClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }, [visible, onClose, duration]);
  
    return (
      <div className={`notification ${visible ? 'visible' : ''}`}>
        <p>{message}</p>
      </div>
    );
  }
  
  export default CustomNotification;