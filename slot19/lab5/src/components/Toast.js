import React from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <BootstrapToast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          show={true}
          delay={3000}
          autohide
          bg={toast.type}
        >
          <BootstrapToast.Header>
            <strong className="me-auto">
              {toast.type === 'success' ? '✅ Success' : 
               toast.type === 'error' ? '❌ Error' : 
               toast.type === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'}
            </strong>
          </BootstrapToast.Header>
          <BootstrapToast.Body className={toast.type === 'success' ? 'text-white' : ''}>
            {toast.message}
          </BootstrapToast.Body>
        </BootstrapToast>
      ))}
    </ToastContainer>
  );
};

export default Toast;
