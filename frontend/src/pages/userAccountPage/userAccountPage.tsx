import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../state/AppContext";
import UserButton from "../../components/UserButton/UserButton";
import UserProfile from "./subPages/UserProfile";
import UserWallets from "./subPages/UserWallets";
import UserProducts from "./subPages/UserProducts";
import UserWatchList from "./subPages/UserWatchList";
import { UserOrders } from "./subPages/UserOrders";
import UserSettings from "./subPages/UserSettings";
import UserMessages from "./subPages/UserMessages";

const buttonList = [
  "Profile",
  "Wallets",
  "Your Products",
  "Watchlist",
  "History of Orders",
  "Messages",
  "Settings",
];

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [content, setContent] = useState(<UserProfile />);

  const updateContent = (value: string) => {
    switch (value) {
      case "Profile":
        setContent(<UserProfile />);
        break;
      case "Wallets":
        setContent(<UserWallets />);
        break;
      case "Your Products":
        setContent(<UserProducts />);
        break;
      case "Watchlist":
        setContent(<UserWatchList />);
        break;
      case "History of Orders":
        setContent(<UserOrders />);
        break;
      case "Settings":
        setContent(<UserSettings />);
        break;
      case "Messages":
        setContent(<UserMessages />);
        break;
      default:
        setContent(<UserProfile />);
        break;
    }
  };

  const handleMenuButtonClick = (value: string) => {
    setActiveTab(value);
    updateContent(value);
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
              {buttonList.map((buttonText) => (
                <UserButton
                  key={buttonText}
                  isActive={activeTab === buttonText}
                  Text={buttonText}
                  onClick={() => handleMenuButtonClick(buttonText)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="tab-content">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
