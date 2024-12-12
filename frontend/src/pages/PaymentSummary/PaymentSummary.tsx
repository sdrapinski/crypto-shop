import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSummary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Po 4 sekundach przekierowuje na stronę główną
    const timer = setTimeout(() => {
      navigate('/Homepage');
    }, 4000);

    // Czyszczenie timeoutu przy odmontowaniu komponentu
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-summary-container">
      <h1 className="payment-success-title">Transakcja udana, poinformowano sprzedawców.</h1>
      <p className="payment-success-message">Zostaniesz poinformowany w momencie wysłania zamówienia</p>
    </div>
  );
};

export default PaymentSummary;