import React, { useContext, useEffect, useState } from "react";
import { Notification as NotificationInterface } from "../../interfaces/Profile.interface";
import NotificationContentSeller from "./NotificationContentSeller";
import NotificationContentBuyer from "./NotificationContentBuyer";
import useAxios from "../../hooks/useAxios";
import { AppContext } from "../../state/AppContext";

interface NotificationProps {
  notification: NotificationInterface;
  user_id:string
  handleConfirmShipment: (delivery_id:string)=>Promise<boolean>
}

const Notification: React.FC<NotificationProps> = ({ notification,user_id,handleConfirmShipment }) => {
  const { productsBought } = notification;
  const appcontext = useContext(AppContext);
  const api = useAxios(appcontext!);
  const [fetchedNotification, setfetchedNotification] = useState<NotificationInterface | null>(null)


  useEffect(() => {
    api
      .get<NotificationInterface>(`/postPayment/getNotificationById/${notification.notification_id}`)
        .then((resp) => {
         
          setfetchedNotification(resp.data)
          
        
        });
  
    
  }, [notification.notification_id])
  

  if (!productsBought || !fetchedNotification) {
    return <div>Brak szczegółowych informacji o powiadomieniu.</div>;
  }


  const isSeller = productsBought.seller_id === user_id; // Sprawdzenie, czy użytkownik jest sprzedającym.

 
  return (
    <div className="notification-details">
    {
        isSeller ? <NotificationContentSeller notification={fetchedNotification} handleConfirmShipment={handleConfirmShipment}/> : <NotificationContentBuyer notification={fetchedNotification} />
    }
    </div>
  );
};

export default Notification;
