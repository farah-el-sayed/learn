import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState, useEffect, createContext, useContext, memo } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast Context
const ToastContext = createContext(null);

// Toast Provider for global toast management
export function ToastProvider({ children }) {useTranslation();
  const [toasts, setToasts] = useState([]);

  const addToast = (options) => {
    const id = Date.now();
    const toast = { id, ...options };
    setToasts((prev) => [...prev, toast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message, options = {}) => addToast({ variant: 'success', message, ...options });
  const error = (message, options = {}) => addToast({ variant: 'error', message, ...options });
  const warning = (message, options = {}) => addToast({ variant: 'warning', message, ...options });
  const info = (message, options = {}) => addToast({ variant: 'info', message, ...options });

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {localizeText(children)}
      <ToastContainer position="top-right" />
    </ToastContext.Provider>);

}

// Hook for using toast context
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const variants = {
  success: {
    bg: 'bg-pine',
    icon: CheckCircle,
    border: 'border-pine/30'
  },
  error: {
    bg: 'bg-clay',
    icon: AlertCircle,
    border: 'border-clay/30'
  },
  warning: {
    bg: 'bg-amber-500',
    icon: AlertTriangle,
    border: 'border-amber-500/30'
  },
  info: {
    bg: 'bg-ink',
    icon: Info,
    border: 'border-ink/30'
  }
};

const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

// Toast container for managing multiple toasts
export function ToastContainer({ position = 'top-right' }) {useTranslation();
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;
  const pos = positions[position] || positions['top-right'];

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${pos}`}
      role="alert"
      aria-live="polite">
      
      {localizeText(toasts.map((toast) =>
      <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>);

}

// Individual toast component - memoized to prevent unnecessary re-renders
const Toast = memo(function Toast({
  id,
  variant = 'info',
  title,
  message,
  duration = 5000,
  action,
  onClose,
  className = ''
}) {useTranslation();
  const [isExiting, setIsExiting] = useState(false);
  const config = variants[variant] || variants.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div
      className={`
        flex items-start gap-3 border ${config.border} ${config.bg} text-paper
        shadow-subtle transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        ${className}
      `.trim()}
      role="alert">
      
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        {localizeText(title && <p className="font-medium text-sm">{localizeText(title)}</p>)}
        {localizeText(message && <p className="text-sm opacity-90 mt-0.5">{localizeText(message)}</p>)}
        {localizeText(action && <div className="mt-2">{localizeText(action)}</div>)}
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label={localizeText("Close notification")}>
        
        <X size={16} />
      </button>
    </div>);

});

export default Toast;
