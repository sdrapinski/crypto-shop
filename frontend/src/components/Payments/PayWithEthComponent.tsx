import React, { useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";
import blockchainService, { getUserWalletAddress } from "../../services/Blockchain";
import { CurrentCryptoPriceInterface } from "../../interfaces/CurrentCryptoPrice.Interface";

interface PayWithEthComponentProps {
ethPrice:CurrentCryptoPriceInterface
}

const PayWithEthComponent:React.FC<PayWithEthComponentProps> = ({ethPrice}) => {
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);
  const [remainingOperations, setRemainingOperations] = useState<number>(0);
  const [failedPayments, setFailedPayments] = useState<string[]>([]);
  const { cart } = appContext!;

  const handlePayment = async () => {
    setLoading(true);
    setFailedPayments([]);
    try {
      // Pobierz adres użytkownika
      const buyerAddress = await getUserWalletAddress();
      if (!buyerAddress) {
        alert("Failed to get wallet address.");
        return;
      }
      const sellerTotals: Record<string, number> = {};
    for (const item of cart.cartItems) {
      const sellerId = item.product.user.user_id;
      const totalUSD = item.product.product_dollar_price * item.quantity;
      sellerTotals[sellerId] = (sellerTotals[sellerId] || 0) + totalUSD;
    }

     
    const totalOperations = Object.keys(sellerTotals).length;
    setRemainingOperations(totalOperations);

    let localfailedPayments = []

      
      for (const sellerId in sellerTotals) {

        const totalUSD = sellerTotals[sellerId];
        const totalETH = (totalUSD / ethPrice.market_data.current_price.usd).toFixed(18);
 
        
        try {
          const result = await blockchainService.buyProduct(sellerId, totalETH.toString());
          if (!result) {
            throw new Error(`Payment failed for seller ${sellerId}`);
          }
          setRemainingOperations((prev) => prev - 1);
        } catch (error) {
          console.error(`Error while paying seller ${sellerId}:`, error);
          localfailedPayments.push(sellerId)
          setFailedPayments((prev) => [...prev, sellerId]);
        }
      }

      if (localfailedPayments.length > 0) {
        alert(
          `Some payments failed. You can retry for the following sellers: ${localfailedPayments.join(
            ", "
          )}`
        );
      } else {
        alert("Payment completed successfully!");
      }
    } catch (error) {
      console.error("Error while making payment:", error);
      alert("Payment could not be processed.");
    } finally {
      setLoading(false);
    }
  };

  const retryFailedPayments = async () => {
    setLoading(true);
    const remainingFailures: string[] = [];

    for (const sellerId of failedPayments) {
      const totalUSD = cart.cartItems
        .filter((item) => item.product.user.user_id === sellerId)
        .reduce((sum, item) => sum + item.product.product_dollar_price * item.quantity, 0);

      const totalETH = (totalUSD / ethPrice.market_data.current_price.usd).toFixed(18);

      try {
        const result = await blockchainService.buyProduct(sellerId, totalETH.toString());
          if (!result) {
            throw new Error(`Payment failed for seller ${sellerId}`);
          }else{
            setFailedPayments((prev) => prev.filter((id) => id !== sellerId)); 
          }
       
      } catch (error) {
        console.error(`Retry failed for seller ${sellerId}:`, error);
        remainingFailures.push(sellerId);
      }
    }

    if (remainingFailures.length > 0) {
      alert(`Retry failed for the following sellers: ${remainingFailures.join(", ")}`);
    } else {
      alert("All failed payments have been completed successfully!");
    }

    setLoading(false);
  };

  return (
    <button onClick={failedPayments.length === 0 ? handlePayment : retryFailedPayments} disabled={loading} className="btn btn-primary">
      {loading ? `Processing... ${remainingOperations} operation left ` : failedPayments.length > 0 ?  `Retry Failed Payments ${failedPayments.length}`:  "Pay with ETH"}
    </button>
  );
};

export default PayWithEthComponent;
