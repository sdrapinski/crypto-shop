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

    useEffect(() => {
      if (activeTab) {
        const updatedTab = notifications.find(
          (notification) =>
            notification.notification_id === activeTab.notification_id
        );
        if (updatedTab && updatedTab !== activeTab) {
          setActiveTab(updatedTab);
        }
      }
    }, [notifications]);
  
    const fetchNotifications = () => {
     
      api
        .get<notificationInterface[]>(`/postPayment/user-notifications/${appcontext!.user!.user_id}`)
        .then((resp) => {
          const data = resp.data;
          setNotifications(data);
          console.log(resp.data);
          
          setActiveTab(resp.data[0])
        });
    };

    const handleMenuButtonClick = (value: notificationInterface) => {
      setActiveTab(value);
      console.log("handle menu button", value);
    
      if (!value.is_read) {
        api
          .put(`/postPayment/mark-notification-read/${value.notification_id}`)
          .then(() => {
            setNotifications((prev) => {
              const updatedNotifications = prev.map((notification) =>
                notification.notification_id === value.notification_id
                  ? { ...notification, is_read: true }
                  : notification
              );
              // Ustaw `activeTab` zgodnie z nowym stanem
              const updatedActiveTab = updatedNotifications.find(
                (notification) =>
                  notification.notification_id === value.notification_id
              );
              setActiveTab(updatedActiveTab || null);
              return updatedNotifications;
            });
          })
          .catch((err) => {
            console.error("Failed to mark notification as read:", err);
          });
      }
    };

    const handleConfirmShipment = async (delivery_id: string): Promise<boolean> => {
      console.log("delivery id "+delivery_id)
      if (!delivery_id) {
        console.error("Delivery ID is missing.");
        return false;
      }
    
      try {
        await api.put(`/postPayment/confirm-shipment/${delivery_id}`).then((resp)=>{
          console.log(resp)
        });
       
    
        // Zaktualizuj stan lokalny notifications
        setNotifications((prev) =>
          prev.map((notification) => {
            if (notification.productsBought?.delivery?.id === delivery_id) {
              return {
                ...notification,
                productsBought: {
                  ...notification.productsBought,
                  delivery: {
                    ...notification.productsBought.delivery,
                    status: "Shipped",
                  },
                },
              };
            }
            return notification; // Unchanged notification
          })
        );
    
    
        // Zaktualizuj aktywną zakładkę, jeśli dotyczy
        if (activeTab?.productsBought?.delivery?.id === delivery_id) {
          setActiveTab((prev) =>
            prev
              ? {
                  ...prev,
                  productsBought: {
                    ...prev.productsBought,
                    delivery: {
                      ...prev.productsBought.delivery,
                      status: "Shipped",
                    },
                  },
                }
              : null
          );
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