import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PaymentSummary = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Po 4 sekundach przekierowuje na stronę główną
    const timer = setTimeout(() => {
      navigate('/notificationsPage');
    }, 4000);
    // Czyszczenie timeoutu przy odmontowaniu komponentu
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="payment-summary-container">
      <h1 className="payment-success-title">The transaction was successful, the sellers were informed</h1>
      <p className="payment-success-message">You can track your order status in notification page </p>
    </div>
  );
};

export default PaymentSummary;