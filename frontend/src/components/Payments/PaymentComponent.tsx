import React, { useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);
interface PaymentComponentProps {
  amount: number;
  gate: string;
  productSuccessfullyBoughtFunction?:()=>void
}

interface CheckoutFormProps {
  amount: number;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentError: React.Dispatch<React.SetStateAction<string | null>>;
  paymentError: string | null;
  isProcessing: boolean;
  appcontext: any;
  gate:string;  // Add the appcontext prop here
  productSuccessfullyBoughtFunction?:()=>void
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ amount, gate,productSuccessfullyBoughtFunction }) => {
  const appcontext = useContext(AppContext);  // This should be inside the component
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        amount={amount} 
        setIsProcessing={setIsProcessing} 
        setPaymentError={setPaymentError} 
        paymentError={paymentError} 
        isProcessing={isProcessing} 
        appcontext={appcontext} 
        gate={gate} // Pass appcontext to CheckoutForm
        productSuccessfullyBoughtFunction={productSuccessfullyBoughtFunction}
      />
    </Elements>
  );
};



const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  setIsProcessing,
  setPaymentError,
  paymentError,
  isProcessing,
  appcontext,
  gate,
  productSuccessfullyBoughtFunction
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError('Stripe.js has not loaded yet. Please try again later.');
      return;
    }

    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setPaymentError('Please enter valid card details.');
      setIsProcessing(false);
      return;
    }

    try {
      const response = await axios.post(`${appcontext?.backendUrl}/payment/create-payment-intent`, {
        amount,
      });

      if (response.status !== 200) {
        throw new Error('Failed to create payment intent.');
      }

      const { clientSecret } = response.data;

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent?.status === 'succeeded') {
        switch(gate){
            case "WK": // to jest to co nas obchodzi
            if(productSuccessfullyBoughtFunction){
              productSuccessfullyBoughtFunction()
            }
           
              return true;
              break;
              
            case "Promo":
              return true;
            default:
              return false;

        }
        //add other cases.
      }
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CardElement />
      </div>
      {paymentError && <div style={{ color: 'red', marginTop: '10px' }}>{paymentError}</div>}
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default PaymentComponent;