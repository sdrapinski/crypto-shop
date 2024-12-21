import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";
import UserButton from "../../components/UserButton/UserButton";
import useAxios from "../../hooks/useAxios";
import { Notification as notificationInterface} from "../../interfaces/Profile.interface";
import Notification from "../../components/Notifications/Notification";

const NotificationsPage = () => {
   const appcontext = useContext(AppContext);
   const api = useAxios(appcontext!);

    const [notifications, setNotifications] = useState<notificationInterface[]>([]);
     const [activeTab, setActiveTab] = useState<notificationInterface | null>(null);
    

  useEffect(() => {
      if (appcontext?.user && notifications.length ===0) {
        fetchNotifications();
      }
    }, [appcontext?.user, api]);
  
    const fetchNotifications = () => {
     
      api
        .get<notificationInterface[]>(`/postPayment/user-notifications/${appcontext!.user!.user_id}`)
        .then((resp) => {
          const data = resp.data;
          setNotifications(data);
          setActiveTab(resp.data[0])
        });
    };

    const handleMenuButtonClick = async (value: notificationInterface) => {
      setActiveTab(value);
      if (!value.is_read) {
        api
          .put(`/postPayment/mark-notification-read/${value.notification_id}`)
          .then(() => {
            // Zaktualizuj lokalny stan
            setNotifications((prev) =>
              prev.map((notification) =>
                notification.notification_id === value.notification_id
                  ? { ...notification, is_read: true }
                  : notification
              )
            );
          })
          .catch((err) => {
            console.error("Failed to mark notification as read:", err);
          });
      }
    };

    const handleConfirmShipment = async (delivery_id: string): Promise<boolean> => {
      if (!delivery_id) {
        console.error("Delivery ID is missing.");
        return false;
      }
    
      try {
        await api.put(`/postPayment/confirm-shipment/${delivery_id}`);
       
    
        // Zaktualizuj stan lokalny notifications
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.productsBought?.delivery?.id === delivery_id
              ? {
                  ...notification,
                  productsBought: {
                    ...notification.productsBought,
                    delivery: {
                      ...notification.productsBought.delivery,
                      status: "Shipped",
                    },
                  },
                }
              : notification
          )
        );
    
        // Zaktualizuj aktywną zakładkę, jeśli dotyczy
        if (activeTab?.productsBought?.delivery?.id === delivery_id) {
          setActiveTab({
            ...activeTab,
            productsBought: {
              ...activeTab.productsBought,
              delivery: {
                ...activeTab.productsBought.delivery,
                status: "Shipped",
              },
            },
          });
        }
    
        return true;
      } catch (err) {
        console.error("Error confirming shipment:", err);
        alert("Failed to confirm shipment. Please try again later.");
        return false;
      }
    };
    


  return (
    <div>
      <div className="row p-4">
        <div className="col-3">
          <div className="d-flex align-items-center">
            <div
              className="nav flex-column nav-pills me-3 w-100"
              id="tablist"
              aria-orientation="vertical"
            >
              {notifications.map((notification) => (
                <UserButton
                  key={notification.notification_id}
                  isActive={activeTab?.notification_id === notification.notification_id}
                  Text={notification.productsBought.buyer_id === appcontext?.user?.user_id ? "You bought an item" : "Your item has been purchased"}
                  onClick={() => handleMenuButtonClick(notification)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-9">
          {
            activeTab && appcontext?.user?.user_id && (
              <div className="tab-content"><Notification notification={activeTab} user_id={appcontext?.user?.user_id} handleConfirmShipment={handleConfirmShipment}/></div>
            )
          }
         
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage