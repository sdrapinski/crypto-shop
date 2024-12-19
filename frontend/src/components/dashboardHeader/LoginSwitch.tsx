import React, { useContext, useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBell, FaPlusSquare } from "react-icons/fa";
import { AppContext } from "../../state/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Notification } from "../../interfaces/Profile.interface";

const LoginSwitch = () => {
  const appcontext = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [menuContent, setMenuContent] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
 
  const api = useAxios(appcontext!);

  useEffect(() => {
    if (appcontext?.user) {
      fetchNotifications();
    }
  }, [appcontext?.user, api]);

  const fetchNotifications = () => {
   
    api
      .get<Notification[]>(`/postPayment/user-notifications/${appcontext!.user!.user_id}`)
      .then((resp) => {
        const data = resp.data;
        setNotifications(data);
        const unread = data.filter((notification) => !notification.is_read).length;
        setUnreadCount(unread);
      });
  };

  const markNotificationsAsRead = () => {
    api
      .post(`/postPayment/mark-notifications-read/${appcontext!.user!.user_id}`)
      .then(() => {
        setUnreadCount(0);
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, is_read: true }))
        );
      });
  };

  const handleButtonClick = (content: string) => {
    if (content !== menuContent) {
      setMenuContent(content);
      setShowMenu(true);
      if (content === "notifications") {
        markNotificationsAsRead();
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const handleRedirectClick = (url: string) => {
    setShowMenu(false);
    navigate(url);
  };

  return (
    <>
      {appcontext?.user ? (
        <div className="header__icons">
          <div className="icon-wrapper--addProduct">
            <NavLink to="/product/addProduct">
              {" "}
              <FaPlusSquare />{" "}
            </NavLink>
          </div>
          <div className="icon-wrapper">
            <FaUser onClick={() => handleButtonClick("user")} />
          </div>

          <div className="icon-wrapper">
            <FaShoppingCart onClick={() => handleButtonClick("cart")} />
          </div>

          <div className="icon-wrapper notification-icon" onClick={() => handleButtonClick("notifications")} >
            <FaBell />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          {showMenu && (
            <div className={`menu-wrapper`}>
              <div className="menu">
                {menuContent === "user" && (
                  <ul className="menu__userOptions">
                    <li>
                      <span className="menu__link" onClick={() => handleRedirectClick("/account")}>
                        Account Details
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          appcontext.logout();
                          navigate("/");
                        }}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}

                {menuContent === "cart" && (
                  <div>
                    <p>Products: {appcontext.cart.cartItems.length}</p>{" "}
                    <span className="menu__link" onClick={() => handleRedirectClick("/usercart")}>
                      {" "}
                      <button>Cart</button>{" "}
                    </span>{" "}
                  </div>
                )}

                {menuContent === "notifications" && (
                  <div>
                    {notifications.length > 0 ? (
                      <ul className="notifications-list"  onClick={() => {
                        handleRedirectClick("/notificationsPage");
                      }}>
                        {notifications.map((notification) => (
                          <li
                            key={notification.notification_id}
                            className={`notification-item ${
                              notification.is_read ? "read" : "unread"
                            }`}
                          >
                            {notification.content}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>You don't have any notifications</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <button className="button --login">Login</button>
        </NavLink>
      )}
    </>
  );
};

export default LoginSwitch;
