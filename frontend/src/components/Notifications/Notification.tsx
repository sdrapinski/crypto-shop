import React from "react";
import { Notification as NotificationInterface } from "../../interfaces/Profile.interface";
import NotificationContentSeller from "./NotificationContentSeller";
import NotificationContentBuyer from "./NotificationContentBuyer";

interface NotificationProps {
  notification: NotificationInterface;
  user_id:string
  handleConfirmShipment: (delivery_id:string)=>Promise<boolean>
}

const Notification: React.FC<NotificationProps> = ({ notification,user_id,handleConfirmShipment }) => {
  const { productsBought } = notification;

  if (!productsBought) {
    return <div>Brak szczegółowych informacji o powiadomieniu.</div>;
  }


  const isSeller = productsBought.seller_id === user_id; // Sprawdzenie, czy użytkownik jest sprzedającym.

 
  return (
    <div className="notification-details">
    {
        isSeller ? <NotificationContentSeller notification={notification} handleConfirmShipment={handleConfirmShipment}/> : <NotificationContentBuyer notification={notification} />
    }
    </div>
  );
};

export default Notification;
