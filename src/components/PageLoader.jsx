import { useTranslation } from "react-i18next";import { useState, useEffect } from 'react';
import LoadingState from './LoadingState.jsx';

// Shows loading indicator only after a delay to avoid flashing
// If the page loads quickly, no loading indicator is shown
export default function PageLoader({ delay = 200, message = 'Loading...' }) {useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;
  return (
    <div className="route-loading" aria-busy="true">
      <span className="route-loading__bar" aria-hidden="true" />
      <LoadingState message={message} className="mx-auto max-w-shell px-5 py-6" />
    </div>);

}
